USE MercaditoMelvin
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
 [Nombre], [Empresa],[Tipo], [Telefono], [Direccion]
)
VALUES
(
 'Melvin Diaz', 'Ceutec', '30%', 1231231, 'Puerto Cortes' 
),
(
 'Jared Velasquez', 'Ceutec', 'define',1231231231, 'SPS' 
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
 [Cuenta]
)
VALUES
(
 'Cuenta cobrar'
),
(
 'cuenta pagar' 
),
(
 'Cuenta Personal' 
),
(
 'Descuento'
)
GO

INSERT INTO Transacciones
(
 [Concepto], [Fecha]
)
VALUES
(
'Credio al cliente 1', '20201111'
),
(
 'Pagar electricidad', '20201030' 
),
(
  'Agua embotella', '20201201'
),
(
  'Comida para la cena', '20201201'
)
GO

INSERT INTO LibroDiario
(
 [Debe], [Haber], [idTransaccion], [idCuenta]
)
VALUES
(
 123.12, 0.00, 1, 1
),
(
 0.00, 123.12, 1, 1
),
(
 250.00, 0.00, 3, 3
),
(
 0.00, 250.00, 3, 4
),
(
 300.00, 0.00, 4, 3
),
(
 0.00, 300.00, 4, 4
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
SELECT * FROM dbo.LibroDiario
GO
SELECT * FROM dbo.CuentasContables
GO
SELECT * FROM dbo.Categoria
GO