/* USE master
GO

IF EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'Mercadito'
)
DROP DATABASE Mercadito
GO
CREATE DATABASE Mercadito
GO */

USE MercaditoMelvin

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
    Tipo [NVARCHAR](50) NOT NULL,
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
    CONSTRAINT pkCuentas PRIMARY KEY(id)
);
GO

IF OBJECT_ID('dbo.Transacciones', 'U') IS NOT NULL
DROP TABLE dbo.Transacciones
GO

CREATE TABLE dbo.Transacciones
(
    id INT NOT NULL IDENTITY(1,1),
    Concepto [NVARCHAR](50) NOT NULL,
    Fecha DATE NOT NULL,
    CONSTRAINT pkTransacciones PRIMARY KEY(id)
);
GO

IF OBJECT_ID('dbo.LibroDiario', 'U') IS NOT NULL
DROP TABLE dbo.LibroDiario
GO

CREATE TABLE dbo.LibroDiario
(
    id INT NOT NULL IDENTITY(1,1),
    idTransaccion INT NOT NULL,
    idCuenta INT NOT NULL,
    Debe FLOAT NOT NULL,
    Haber FLOAT NOT NULL,
    CONSTRAINT pkLibroDiario PRIMARY KEY(id),
    CONSTRAINT fkTransaccionesLibroDiario FOREIGN KEY(idTransaccion) REFERENCES Transacciones(id),
    CONSTRAINT fkLibroCuenta FOREIGN KEY(idCuenta) REFERENCES CuentasContables(id)
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

--Consultas que pide el ejercicio de prueba
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