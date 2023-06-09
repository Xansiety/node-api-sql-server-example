import { getConnection, sql, queries } from "../database/index.js"

export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllProducts);
        const totalProductos = await pool.request().query(queries.getTotalProducts);

        const [productos, total] = await Promise.all([result, totalProductos]);

        res.json({
            'Total products:': total.recordset[0].TotalProducts,
            'Products': productos.recordset
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' })
    }
}

export const createProduct = async (req, res) => {
    const { name, description } = req.body;
    let { quantity } = req.body;
    if (name == null || description == null) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' })
    }
    if (quantity == null) {
        quantity = 0;
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('description', sql.Text, description)
            .input('quantity', sql.Int, quantity)
            .query(queries.createProduct);
        res.status(201).json({ name, description, quantity })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' })
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const product = await pool.request().input('id', sql.Int, id).query(queries.getProductById);
        if (product.recordset.length < 1) {
            return res.status(404).json({ msg: `Not found product with id ${id}` })
        }
        res.json(product.recordset[0]);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const product = await pool.request().input('id', sql.Int, id).query(queries.getProductById);
        if (product.recordset.length < 1) {
            return res.status(404).json({ msg: `Not found product with id ${id}` })
        }
        await pool.request().input('id', sql.Int, id).query(queries.deleteProduct);
        res.json({ msg: `Product with id ${id} deleted` })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' })
    }
}


export const getTotalProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getTotalProducts);
        res.json({
            'Total products:': result.recordset[0].TotalProducts
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' })
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity } = req.body;

    if (isNaN(Number(id))) return res.status(400).json({ msg: 'Bad Request. Id must be a number' })

    if (name == null || description == null || quantity == null) return res.status(400).json({ msg: 'Bad Request. Please fill all fields' })

    try {
        const pool = await getConnection();
        const product = await pool.request().input('id', sql.Int, id).query(queries.getProductById);
        if (product.recordset.length < 1) {
            return res.status(404).json({ msg: `Not found product with id ${id}` })
        }
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('description', sql.Text, description)
            .input('quantity', sql.Int, quantity)
            .input('id', sql.Int, id)
            .query(queries.updateProduct);
        res.json({ name, description, quantity })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' })
    }
}