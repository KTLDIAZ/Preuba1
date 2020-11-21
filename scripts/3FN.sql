USE master
GO

IF EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'Mercadito'
)
DROP DATABASE Mercadito
GO
CREATE DATABASE Mercadito
GO

USE Mercadito

IF OBJECT_ID('dbo.Categoria', 'U') IS NOT NULL
DROP TABLE dbo.Categoria
GO

CREATE TABLE dbo.Categoria
(
    id INT NOT NULL IDENTITY(1,1),
    Nombre [NVARCHAR](50) NOT NULL,
    Descripciom [NVARCHAR](50) NOT NULL,
    CONSTRAINT pkCategoria PRIMARY KEY(id)
);
GO

IF OBJECT_ID('dbo.Proveedor', 'U') IS NOT NULL
DROP TABLE dbo.Proveedor
GO

CREATE TABLE dbo.Proveedor
(
    id INT NOT NULL IDENTITY(1,1),
    Nombre [NVARCHAR](50) NOT NULL,
    Empresa [NVARCHAR](50) NOT NULL,
    Telefono INT NOT NULL,
    Direccion [NVARCHAR](50) NOT NULL,
    CONSTRAINT pkProveedor PRIMARY KEY(id)
);
GO

IF OBJECT_ID('dbo.Producto', 'U') IS NOT NULL
DROP TABLE dbo.Producto
GO

CREATE TABLE dbo.Producto
(
    id INT NOT NULL IDENTITY(1,1),
    Nombre [NVARCHAR](50) NOT NULL,
    idCategoria INT NOT NULL,
    idProveedor INT NOT NULL,
    CostoCompra FLOAT NOT NULL,
    PrecioVenta FLOAT NOT NULL,
    Existencias INT NOT NULL,
    CONSTRAINT pkProductos PRIMARY KEY(id),
    CONSTRAINT fkProductosCategoria FOREIGN KEY(idCategoria) REFERENCES Categoria(id),
    CONSTRAINT fkProductosProveedor FOREIGN KEY(idProveedor) REFERENCES Proveedor(id)
);
GO

IF OBJECT_ID('dbo.Pedido', 'U') IS NOT NULL
DROP TABLE dbo.Pedido
GO

CREATE TABLE dbo.Pedido
(
    id INT NOT NULL IDENTITY(1,1),
    idProveedor INT NOT NULL,
    FechaEntrega DATE NOT NULL,
    CostoTotal FLOAT NOT NULL,
    CONSTRAINT pkPedido PRIMARY KEY(id),
    CONSTRAINT fkPedidoProveedor FOREIGN KEY(idProveedor) REFERENCES Proveedor(id),
);
GO

IF OBJECT_ID('dbo.DetallePedido', 'U') IS NOT NULL
DROP TABLE dbo.DetallePedido
GO

CREATE TABLE dbo.DetallePedido
(
    id INT NOT NULL IDENTITY(1,1),
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    CostoUnidad FLOAT NOT NULL,
    Cantidad INT NOT NULL,
    CONSTRAINT pkDetallePedido PRIMARY KEY(id),
    CONSTRAINT fkDetallePedido_Pedido FOREIGN KEY(idPedido) REFERENCES Pedido(id),
    CONSTRAINT fkDetalleProducto FOREIGN KEY(idProducto) REFERENCES Producto(id)
);
GO

IF OBJECT_ID('dbo.Cliente', 'U') IS NOT NULL
DROP TABLE dbo.Cliente
GO

CREATE TABLE dbo.Cliente
(
    id INT NOT NULL IDENTITY(1,1),
    Nombre [NVARCHAR](50) NOT NULL,
    Direccion [NVARCHAR](50) NOT NULL,
    Telefono INT NOT NULL,
    CreditoAPB INT NOT NULL,
    Saldo INT NOT NULL,
    CONSTRAINT pkCliente PRIMARY KEY(id)
);
GO

IF OBJECT_ID('dbo.Factura', 'U') IS NOT NULL
DROP TABLE dbo.Factura
GO

CREATE TABLE dbo.Factura
(
    id INT NOT NULL IDENTITY(1,1),
    idCliente INT NOT NULL,
    CostoTotal FLOAT NOT NULL,
    Fecha DATE NOT NULL,
    CONSTRAINT pkFactura PRIMARY KEY(id),
    CONSTRAINT fkFacturaCliente FOREIGN KEY(idCliente)  REFERENCES Cliente(id)
);
GO

IF OBJECT_ID('dbo.DetalleFactura', 'U') IS NOT NULL
DROP TABLE dbo.DetalleFactura
GO

CREATE TABLE dbo.DetalleFactura
(
    id INT NOT NULL IDENTITY(1,1),
    idFactura INT NOT NULL,
    idProducto INT NOT NULL,
    Cantidad INT NOT NULL,
    Precio FLOAT NOT NULL,
    CONSTRAINT pkDetalleFactura PRIMARY KEY(id),
    CONSTRAINT pkDetalleFactura_Factura FOREIGN KEY(idFactura) REFERENCES Factura(id),
    CONSTRAINT pkDetalleProducto FOREIGN KEY(idFactura) REFERENCES Factura(id)
);
GO

IF OBJECT_ID('dbo.CuentasContables', 'U') IS NOT NULL
DROP TABLE dbo.CuentasContables
GO

CREATE TABLE dbo.CuentasContables
(
    id INT NOT NULL IDENTITY(1,1),
    Cuenta [NVARCHAR](50) NOT NULL,
    Debe FLOAT NOT NULL,
    Haber FLOAT NOT NULL,
    CONSTRAINT pkCuentas PRIMARY KEY(id)
);
GO

IF OBJECT_ID('dbo.Transacciones', 'U') IS NOT NULL
DROP TABLE dbo.Transacciones
GO

CREATE TABLE dbo.Transacciones
(
    id INT NOT NULL IDENTITY(1,1),
    idCuenta INT NOT NULL,
    Concepto [NVARCHAR](50) NOT NULL,
    Debe FLOAT NOT NULL,
    Haber FLOAT NOT NULL,
    Fecha DATE NOT NULL,
    CONSTRAINT pkTransacciones PRIMARY KEY(id),
    CONSTRAINT fkTransaccionesCuenta FOREIGN KEY(idCuenta) REFERENCES CuentasContables(id)
);
GO

IF OBJECT_ID('dbo.PagosClientes', 'U') IS NOT NULL
DROP TABLE dbo.PagosClientes
GO

CREATE TABLE dbo.PagosClientes
(
    id INT NOT NULL IDENTITY(1,1),
    idCliente INT NOT NULL,
    idTransaccion INT NOT NULL,
    CONSTRAINT pkPagosClientes PRIMARY KEY(id),
    CONSTRAINT fkPagoClientes_Cliente FOREIGN KEY(idCliente) REFERENCES Cliente(id),
    CONSTRAINT fkPagoClientesTransaccion FOREIGN KEY(idTransaccion) REFERENCES Transacciones(id)
);
GO

INSERT INTO Categoria
(
 [Nombre], [Descripciom]
)
VALUES
( 
 'Cocina', 'Procutos de cocina'
),
( 
 'Jardin', 'Productos de jardineria'
)
GO

INSERT INTO Proveedor
(
 [Nombre], [Empresa], [Telefono], [Direccion]
)
VALUES
(
 'Melvin Diaz', 'Ceutec', 1231231, 'Puerto Cortes' 
),
(
 'Jared Velasquez', 'Ceutec', 1231231231, 'SPS' 
)
GO

INSERT INTO Producto
(
 [Nombre], [idCategoria], [idProveedor], [CostoCompra], [PrecioVenta], [Existencias]
)
VALUES
(
 'Rica sula', '1', '1', 19.2, 32.1, 100
),
(
 'Podadora', '2', '2', 119.2, 332.1, 20 
)
GO

INSERT INTO Pedido
(
 [idProveedor], [FechaEntrega], [CostoTotal]
)
VALUES
(
 1, '20201011', 1999.99 
),
(
 2, '20201101', 2999.99 
)
GO

INSERT INTO DetallePedido
(
 [idPedido], [idProducto], [CostoUnidad], [Cantidad]
)
VALUES
(
 1, 1, 200.99, 100 
),
(
 2, 2, 231.10, 20 
)
GO

INSERT INTO Cliente
(
 [Nombre], [Direccion], [Telefono], [CreditoAPB], [Saldo]
)
VALUES
(
 'David Diaz', 'Barrio buenos aires', 123123213, 300, 250 
),
(
 'asdasd', 'adadasd',  1245435, 350, 50
)
GO

INSERT INTO Factura
(
 [idCliente], [CostoTotal], [Fecha]
)
VALUES
(
 1, 899.99, '20201110' 
),
(
 2, 769.72, '20201111'
),
(
 2, 769.72, '20201111'
),
(
 2, 769.72, '20201111'
)
GO

INSERT INTO DetalleFactura
(
 [idFactura], [idProducto], [Cantidad], [Precio]
)
VALUES
(
 1, 1, 12, 52 
),
(
 2, 2, 2, 3
)
GO

INSERT INTO CuentasContables
(
 [Cuenta], [Debe], [Haber]
)
VALUES
(
 'Cuenta cobrar', 2190.12, 0 
),
(
 'cuenta pagar', 0, 3123 
)
GO

INSERT INTO Transacciones
(
 [idCuenta], [Concepto], [Debe], [Haber], [Fecha]
)
VALUES
(
 1, 'Credio al cliente 1', 1232, 0, '20201111'
),
(
 2, 'Pagar electricidad', 0, 12312, '20201030' 
)
GO

INSERT INTO PagosClientes
(
 [idCliente], [idTransaccion]
)
VALUES
(
 1, 1 
),
(
 2, 2 
)
GO

SELECT * FROM dbo.Cliente
GO
SELECT * FROM dbo.Producto
GO
SELECT * FROM dbo.Proveedor
GO
SELECT * FROM dbo.Factura
GO
SELECT * FROM dbo.DetalleFactura
GO
SELECT * FROM dbo.Pedido
GO
SELECT * FROM dbo.DetallePedido
GO
SELECT * FROM dbo.PagosClientes
GO
SELECT * FROM dbo.Transacciones
GO
SELECT * FROM dbo.CuentasContables
GO
SELECT * FROM dbo.Categoria
GO

--Consultas que pide el ejercicio

SELECT idCliente, COUNT(idCliente) as 'Pagos de clientes' FROM dbo.PagosClientes
GROUP BY idCliente

SELECT Cliente.Nombre, Cliente.CreditoAPB, Cliente.Saldo, PagosClientes.id 
FROM PagosClientes 
join Cliente on PagosClientes.idCliente = Cliente.id
WHERE Cliente.Saldo BETWEEN Cliente.CreditoAPB - 100 AND Cliente.CreditoAPB

SELECT Cliente.Nombre, Factura.Fecha, Producto.Nombre, DetalleFactura.Precio, 
DetalleFactura.Cantidad, Factura.CostoTotal 
FROM Factura
join Cliente on Factura.idCliente = Cliente.id 
join DetalleFactura on Factura.id = DetalleFactura.idFactura 
join Producto on DetalleFactura.idProducto = Producto.id