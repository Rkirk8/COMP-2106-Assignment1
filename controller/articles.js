import express from 'express';

// Model reference
import Article from '../models/articles.js';

// Create Express router object to handle HTTP request/response calls
const router = express.Router();

/**
 * @swagger
 * /api/v1/articles:
 *   get:
 *     summary: Find all articles
 *     tags:
 *       - Article
 *     responses:
 *       200:
 *         description: Returns all articles
 */
router.get('/', async (req, res) => {
    let articles = await Article.find();
    return res.status(200).json(articles);
});

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   get:
 *     summary: Find selected article by id
 *     tags:
 *       - Article
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Returns single article
 *       404:
 *         description: Not found
 */
router.get('/:id', async (req, res) => {
    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ err: "Not Found" });
    return res.status(200).json(article);
});


/**
 * @swagger
 * /api/v1/articles:
 *   post:
 *     summary: Create new article from request body
 *     tags:
 *       - Article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               author:
 *                 type: string
 *                 required: true
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resource created
 *       400:
 *         description: Bad Request
 */
router.post('/', async (req, res) => {
    try {
        await Article.create(req.body);
        return res.status(201).json();
    } catch (err) {
        return res.status(400).json({ err: `Bad Request: ${err.message}` });
    }
});

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   put:
 *     summary: Update selected article from request body
 *     tags:
 *       - Article
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 required: true
 *               title:
 *                 type: string
 *                 required: true
 *               author:
 *                 type: string
 *                 required: true
 *               content:
 *                 type: string
 *     responses:
 *       204:
 *         description: No content
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.put('/:id', async (req, res) => {
    try {
        let article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ err: "Not Found" });
        if (req.params.id != req.body._id) {
            return res.status(400).json({ err: "Bad Request: IDs do not match" });
        }
        await Article.findByIdAndUpdate(req.params.id, req.body);
        return res.status(204).json();
    } catch (err) {
        return res.status(400).json({ err: `Bad Request: ${err.message}` });
    }
});

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   delete:
 *     summary: Find and delete selected article by id
 *     tags:
 *       - Article
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Not found
 */
router.delete('/:id', async (req, res) => {
    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ err: "Not Found" });
    await Article.findByIdAndDelete(req.params.id);
    return res.status(204).json();
});

// Make controller public
export default router;
