USE Mercadito
GO

IF EXISTS (
SELECT *
    FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'vTransaccionesProveedor'
)
DROP VIEW dbo.vTransaccionesProveedor
GO

CREATE VIEW dbo.vTransaccionesProveedor
AS
    SELECT Ped.FechaEntrega, P.Nombre, Pro.Nombre AS 'Producto', D.Cantidad, D.CostoUnidad 
    FROM Pedido Ped
    INNER JOIN DetallePedido D ON D.idPedido = Ped.id
    INNER JOIN Proveedor P ON P.id = Ped.idProveedor
    INNER JOIN Producto Pro ON Pro.id = D.idProducto
GO

IF EXISTS (
SELECT *
    FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'vTransaccionesCliente'
)
DROP VIEW dbo.vTransaccionesCliente
GO

CREATE VIEW dbo.vTransaccionesCliente
AS
    SELECT F.Fecha, Cli.Nombre , Pro.Nombre AS 'Producto', DF.Cantidad, DF.Precio, F.CostoTotal 
    FROM Factura F
    INNER JOIN DetalleFactura DF ON DF.idFactura = F.id
    INNER JOIN Producto Pro ON Pro.id = DF.idProducto
    INNER JOIN Cliente Cli ON Cli.id = F.idCliente
GO

IF EXISTS (
SELECT *
    FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'vProductosCategoria'
)
DROP VIEW dbo.vProductosCategoria
GO

CREATE VIEW dbo.vProductosCategoria
AS
    SELECT Cat.Nombre, COUNT(DF.idProducto) AS 'Cantidad ventas' 
    FROM DetalleFactura DF
    INNER JOIN Producto Pro ON Pro.id = DF.idProducto
    RIGHT JOIN Categoria Cat ON Cat.id = Pro.idCategoria
    GROUP BY Cat.Nombre
GO

IF EXISTS (
SELECT *
    FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'vPrecio30'
)
DROP VIEW dbo.vPrecio30
GO

CREATE VIEW dbo.vPrecio30
AS
    SELECT Prod.Nombre 
    FROM Producto Prod
    INNER JOIN Proveedor Prov ON Prov.id = Prod.idProveedor
    WHERE Prov.Tipo = '30%'
GO

IF EXISTS (
SELECT *
    FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'vPrecioDefinido'
)
DROP VIEW dbo.vPrecioDefinido
GO

CREATE VIEW dbo.vPrecioDefinido
AS
    SELECT Prod.Nombre 
    FROM Producto Prod
    INNER JOIN Proveedor Prov ON Prov.id = Prod.idProveedor
    WHERE Prov.Tipo = 'define'
GO

IF EXISTS (
SELECT *
    FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'vPagosClientes'
)
DROP VIEW dbo.vPagosClientes
GO

CREATE VIEW dbo.vPagosClientes
AS
    SELECT C.Nombre, COUNT(PC.idCliente) AS 'Total de pagos', C.Saldo 
    FROM PagosClientes PC
    INNER JOIN Cliente C ON C.id = PC.id 
    GROUP BY C.Nombre, C.Saldo
GO

IF EXISTS (
SELECT *
    FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'vCuentaPersonal'
)
DROP VIEW dbo.vCuentaPersonal
GO

CREATE VIEW dbo.vCuentaPersonal
AS
    SELECT LD.idTransaccion, CC.Cuenta, LD.Debe, LD.Haber 
    FROM LibroDiario LD
    INNER JOIN CuentasContables CC ON CC.id = LD.idCuenta
    WHERE idCuenta = 3
GO