
export const queries = {
    getAllProducts: 'select * from products',
    createProduct: 'insert into products (name, description, quantity) values (@name, @description, @quantity)',
    getProductById: 'select * from products where id = @id',
    deleteProduct: 'delete from products where id = @id',
    getTotalProducts: 'select count(*) as TotalProducts from products',
    updateProduct: 'update products set name = @name, description = @description, quantity = @quantity where id = @id'
}