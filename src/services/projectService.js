const db = require("../db");

const getProjects = async (page, limit) => {
  const offset = (page - 1) * limit;

  const countQuery = "SELECT COUNT(*) AS total FROM projects";
  const query = "SELECT * FROM projects LIMIT ? OFFSET ?";

  try {
    const countResults = await new Promise((resolve, reject) => {
      db.query(countQuery, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    const total = countResults[0].total;

    const projectResults = await new Promise((resolve, reject) => {
      db.query(query, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    return {
      projects: projectResults,
      total: total,
    };
  } catch (error) {
    throw error;
  }
};

const getProjectById = async (id) => {
  const query = "SELECT * FROM projects WHERE id = ?";

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (results.length > 0) {
      return results[0];
    } else {
      throw new Error("Project not found");
    }
  } catch (error) {
    throw error;
  }
};

const createProject = async (projectData) => {
  const { name, description, project_manager, assigned_to, status } =
    projectData;
  const insertProjectQuery =
    "INSERT INTO projects (name, description, project_manager, status) VALUES (?, ?, ?, ?)";

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        insertProjectQuery,
        [name, description, project_manager, status],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });

    const projectId = results.insertId;

    if (assigned_to && assigned_to.length > 0) {
      const insertAssignmentsQuery =
        "INSERT INTO project_user (project_id, user_id) VALUES ?";
      const values = assigned_to.map((userId) => [projectId, userId]);

      await new Promise((resolve, reject) => {
        db.query(insertAssignmentsQuery, [values], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
    }

    return { id: projectId, ...projectData };
  } catch (error) {
    throw error;
  }
};

const updateProject = async (projectId, projectData) => {
  const { name, description, project_manager, assigned_to, status } =
    projectData;

  const updateProjectQuery =
    "UPDATE projects SET name = ?, description = ?, project_manager = ?, status = ? WHERE id = ?";

  try {
    const updateResults = await new Promise((resolve, reject) => {
      db.query(
        updateProjectQuery,
        [name, description, project_manager, status, projectId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });

    if (updateResults.affectedRows > 0) {
      const deleteAssignmentsQuery =
        "DELETE FROM project_user WHERE project_id = ?";
      await new Promise((resolve, reject) => {
        db.query(deleteAssignmentsQuery, [projectId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });

      if (assigned_to && assigned_to.length > 0) {
        const insertAssignmentsQuery =
          "INSERT INTO project_user (project_id, user_id) VALUES ?";
        const values = assigned_to.map((userId) => [projectId, userId]);

        await new Promise((resolve, reject) => {
          db.query(insertAssignmentsQuery, [values], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
      }

      return { id: projectId, ...projectData };
    } else {
      throw new Error("Project not found");
    }
  } catch (error) {
    throw error;
  }
};

const deleteProject = async (projectId) => {
  const deleteProjectQuery = "DELETE FROM projects WHERE id = ?";

  try {
    const deleteResults = await new Promise((resolve, reject) => {
      db.query(deleteProjectQuery, [projectId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (deleteResults.affectedRows > 0) {
      const deleteAssignmentsQuery =
        "DELETE FROM project_user WHERE project_id = ?";
      await new Promise((resolve, reject) => {
        db.query(deleteAssignmentsQuery, [projectId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });

      return true;
    } else {
      throw new Error("Project not found");
    }
  } catch (error) {
    throw error;
  }
};

const searchProjects = async (projectName) => {
  const searchQuery = "SELECT * FROM projects WHERE name LIKE ?";

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(searchQuery, [`%${projectName}%`], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    return results;
  } catch (error) {
    throw error;
  }
};

const assignUsersToProject = async (projectId, userIds) => {
  const checkProjectQuery = "SELECT * FROM projects WHERE id = ?";

  try {
    const projectResults = await new Promise((resolve, reject) => {
      db.query(checkProjectQuery, [projectId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (projectResults.length === 0) {
      throw new Error("Project not found");
    }

    const deletePreviousAssignmentsQuery =
      "DELETE FROM project_user WHERE project_id = ?";
    await new Promise((resolve, reject) => {
      db.query(deletePreviousAssignmentsQuery, [projectId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (!Array.isArray(userIds)) {
      userIds = [userIds];
    }

    const insertAssignmentsQuery =
      "INSERT INTO project_user (project_id, user_id) VALUES ?";
    const values = userIds.map((userId) => [projectId, userId]);

    await new Promise((resolve, reject) => {
      db.query(insertAssignmentsQuery, [values], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    return { message: "Users assigned to project successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
  assignUsersToProject,
};
