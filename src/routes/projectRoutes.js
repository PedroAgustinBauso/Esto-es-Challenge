const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crea un nuevo proyecto
 *     parameters:
 *       - in: body
 *         name: project
 *         description: Datos del proyecto a crear
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             project_manager:
 *               type: string
 *             assigned_to:
 *               type: integer
 *             status:
 *               type: string
 *     responses:
 *       201:
 *         description: Proyecto creado
 */
router.post("/", projectController.createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtiene una lista de proyectos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de la página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de elementos por página
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
router.get("/", projectController.getProjects);

/**
 * @swagger
 * /projects/search:
 *   get:
 *     summary: Busca proyectos por nombre
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del proyecto
 *     responses:
 *       200:
 *         description: Lista de proyectos coincidentes
 */
router.get("/search", projectController.searchProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtiene un proyecto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *       404:
 *         description: Proyecto no encontrado
 */
router.get("/:id", projectController.getProjectById);

/**
 * @swagger
 * /projects/{id}/users:
 *   post:
 *     summary: Asigna usuarios a un proyecto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *       - in: body
 *         name: body
 *         description: Datos para asignar usuarios al proyecto
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userIds:
 *               type: array
 *               items:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuarios asignados al proyecto
 *       404:
 *         description: Proyecto no encontrado
 */
router.post("/:id/users", projectController.assignUsersToProject);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Actualiza un proyecto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               project_manager:
 *                 type: string
 *               assigned_to:
 *                 type: array
 *                 items:
 *                   type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proyecto actualizado
 *       404:
 *         description: Proyecto no encontrado
 */
router.put("/:id", projectController.updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Elimina un proyecto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       204:
 *         description: Proyecto eliminado
 *       404:
 *         description: Proyecto no encontrado
 */
router.delete("/:id", projectController.deleteProject);

module.exports = router;
