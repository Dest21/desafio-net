using Microsoft.AspNetCore.Mvc;
using CasosIndividuales;

namespace DesafioAPI.Controllers
{
    [ApiController]
    [Route("casos")]
    public class CasosController : ControllerBase
    {
        [HttpGet("order-range")]
        public ActionResult<object> GetOrderRange()
        {
            try
            {
                var ejemplos = new[]
                {
                    new int[] { 2, 1, 4, 5 },
                    new int[] { 10, 3, 8, 1, 7, 6, 2, 9 },
                    new int[] { 2, 4, 6, 8 },
                    new int[] { 1, 3, 5, 7 },
                    new int[] { 15, 22, 7, 3, 11, 18, 4, 9 }
                };

                var resultados = new List<object>();
                foreach (var ejemplo in ejemplos)
                {
                    var resultado = OrderRange.Build(ejemplo);
                    resultados.Add(new
                    {
                        input = ejemplo,
                        pares = resultado.Pares,
                        impares = resultado.Impares
                    });
                }

                return Ok(new
                {
                    titulo = "CASO 1: OrderRange",
                    descripcion = "Método que separa números pares e impares, ordenándolos ascendentemente",
                    funcionamiento = "1. Recibe una colección de enteros\n" +
                                   "2. Filtra números pares (n % 2 == 0)\n" +
                                   "3. Filtra números impares (n % 2 != 0)\n" +
                                   "4. Ordena ambas listas ascendentemente\n" +
                                   "5. Retorna objeto con ambas listas",
                    ejemplos = resultados
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("order-range")]
        public ActionResult<object> PostOrderRange([FromBody] int[] numbers)
        {
            try
            {
                var resultado = OrderRange.Build(numbers);
                return Ok(new
                {
                    input = numbers,
                    pares = resultado.Pares,
                    impares = resultado.Impares
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("money-parts")]
        public ActionResult<object> GetMoneyParts()
        {
            try
            {
                var ejemplos = new[] { "0.1", "0.15", "0.3", "1" };
                var resultados = new List<object>();

                foreach (var monto in ejemplos)
                {
                    try
                    {
                        var combinaciones = MoneyParts.Build(monto);
                        var combinacionesArray = new List<decimal[]>();
                        
                        int contador = 0;
                        foreach (var combinacion in combinaciones)
                        {
                            if (contador >= 5) break;
                            combinacionesArray.Add(combinacion.ToArray());
                            contador++;
                        }

                        resultados.Add(new
                        {
                            monto = monto,
                            combinacionesEncontradas = combinaciones.Count,
                            combinaciones = combinacionesArray.ToArray()
                        });
                    }
                    catch (Exception ex)
                    {
                        resultados.Add(new
                        {
                            monto = monto,
                            error = ex.Message,
                            combinacionesEncontradas = 0,
                            combinaciones = new decimal[0][]
                        });
                    }
                }

                return Ok(new
                {
                    titulo = "CASO 2: MoneyParts",
                    descripcion = "Método que genera todas las combinaciones monetarias para un monto dado",
                    denominaciones = new[] { 0.05m, 0.1m, 0.2m, 0.5m, 1m, 2m, 5m, 10m, 20m, 50m, 100m, 200m },
                    funcionamiento = "1. Recibe un monto como string\n" +
                                   "2. Valida que sea un número positivo\n" +
                                   "3. Usa recursión para encontrar todas las combinaciones\n" +
                                   "4. Prueba cada denominación desde la menor\n" +
                                   "5. Para cada denominación, prueba desde 0 hasta el máximo posible\n" +
                                   "6. Retorna todas las combinaciones válidas",
                    ejemplos = resultados
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("money-parts")]
        public ActionResult<object> PostMoneyParts([FromBody] string monto)
        {
            try
            {
                // Validar que el monto no sea demasiado alto para evitar timeouts
                if (decimal.TryParse(monto, out decimal montoDecimal))
                {
                    if (montoDecimal > 5)
                    {
                        return BadRequest(new { 
                            error = $"El monto {monto} es demasiado alto. Por favor ingrese un valor menor o igual a 5 para evitar timeouts. Valores sugeridos: 0.15, 1.5, 2, 3, 5." 
                        });
                    }
                }

                var combinaciones = MoneyParts.Build(monto);
                var combinacionesArray = new List<decimal[]>();
                
                foreach (var combinacion in combinaciones)
                {
                    combinacionesArray.Add(combinacion.ToArray());
                }

                return Ok(new
                {
                    monto = monto,
                    combinacionesEncontradas = combinaciones.Count,
                    combinaciones = combinacionesArray.ToArray()
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}