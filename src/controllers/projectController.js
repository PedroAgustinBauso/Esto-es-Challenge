const projectService = require("../services/projectService");

const getProjects = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const { projects, total } = await projectService.getProjects(page, limit);
    res.json({
      projects: projects,
      page: page,
      limit: limit,
      total: total,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProjectById = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await projectService.getProjectById(projectId);
    res.json(project);
  } catch (error) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: "Project not found" });
    } else {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const createProject = async (req, res) => {
  try {
    const { name, description, project_manager, assigned_to, status } =
      req.body;
    const newProject = await projectService.createProject({
      name,
      description,
      project_manager,
      assigned_to,
      status,
    });
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const updatedProject = await projectService.updateProject(
      projectId,
      req.body
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: "Project not found" });
    } else {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    await projectService.deleteProject(projectId);
    res.status(204).send();
  } catch (error) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: "Project not found" });
    } else {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const searchProjects = async (req, res) => {
  const projectName = req.query.name;

  try {
    const projects = await projectService.searchProjects(projectName);
    res.json(projects);
  } catch (error) {
    console.error("Error searching projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const assignUsersToProject = async (req, res) => {
  const projectId = req.params.id;
  const { userIds } = req.body;

  try {
    const response = await projectService.assignUsersToProject(
      projectId,
      userIds
    );
    res.status(200).json(response);
  } catch (error) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: "Project not found" });
    } else {
      console.error("Error assigning users to project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
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
