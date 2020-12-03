USE Mercadito
GO

CREATE TRIGGER dbo.AddInventory
ON dbo.Pedido
AFTER UPDATE
AS
UPDATE Prod SET Prod.Existencias = Prod.Existencias + DP.Cantidad
    FROM Producto Prod
    INNER JOIN DetallePedido DP ON Prod.id = DP.idProducto
    INNER JOIN Pedido P ON P.id = DP.idPedido
    WHERE P.FechaEntrega = GETDATE()