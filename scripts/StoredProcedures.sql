USE MercaditoMelvin
GO

IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'ClasificarProveedores'
)
DROP PROCEDURE dbo.ClasificarProveedores
GO

CREATE PROCEDURE dbo.ClasificarProveedores
    @Comprados  INT = 0,
    @Vendidos INT  = 0,
    @FechaInicial DATE = '20201101',
    @Periodo INT = 10
AS
    DECLARE @FechaFinal DATE
    SET @FechaFinal = DATEADD(DAY,@Periodo,@FechaInicial)
    PRINT @FechaFinal
    SELECT Pro.Nombre, SUM(DP.Cantidad) AS 'Cantidad comprada', 
    CASE WHEN SUM(DF.Cantidad)/@Periodo >= @Vendidos AND SUM(DP.Cantidad) >= @Comprados
         THEN 'Alto'
         Else 'Bajo'
    END Clasificaion
    FROM  DetallePedido DP
    INNER JOIN Pedido P ON P.id = DP.idPedido
    INNER JOIN Proveedor Pro ON Pro.id = P.idProveedor 
    INNER JOIN Producto Prod ON Prod.idProveedor = Pro.id
    INNER JOIN DetalleFactura DF ON Prod.id = DF.idProducto
    INNER JOIN Factura F ON F.id = DF.idFactura
    WHERE P.FechaEntrega BETWEEN @FechaInicial AND @FechaFinal 
    GROUP BY Pro.Nombre, DP.Cantidad, Prod.Nombre
    ORDER BY SUM(DP.Cantidad) DESC
GO

EXECUTE dbo.ClasificarProveedores 100, 5, '2020/10/01', 30
GO