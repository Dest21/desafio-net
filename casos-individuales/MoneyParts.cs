using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace CasosIndividuales
{
    /// <summary>
    /// CASO 2: MoneyParts - Generar todas las combinaciones monetarias para un monto dado
    /// </summary>
    public class MoneyParts
    {
        // Denominaciones monetarias disponibles
        private static readonly decimal[] Denominaciones = 
        {
            0.05m, 0.1m, 0.2m, 0.5m, 1m, 2m, 5m, 10m, 20m, 50m, 100m, 200m
        };

        /// <summary>
        /// Genera todas las combinaciones posibles de denominaciones que suman el monto dado
        /// </summary>
        /// <param name="amount">Monto como string (ej: "0.1", "1.5", "5")</param>
        /// <returns>Lista de listas con todas las combinaciones posibles</returns>
        /// <example>
        /// Input: "0.1"
        /// Output: [[0.05, 0.05], [0.1]]
        /// </example>
        public static List<List<decimal>> Build(string amount)
        {
            if (string.IsNullOrWhiteSpace(amount))
                throw new ArgumentException("El monto no puede ser nulo o vacío", nameof(amount));

            if (!decimal.TryParse(amount, NumberStyles.Number, CultureInfo.InvariantCulture, out decimal targetAmount))
                throw new ArgumentException($"El monto '{amount}' no es un número válido", nameof(amount));

            if (targetAmount <= 0)
                throw new ArgumentException("El monto debe ser mayor a cero", nameof(amount));

            // Redondear a 2 decimales para evitar problemas de precisión
            targetAmount = Math.Round(targetAmount, 2);

            var result = new List<List<decimal>>();
            var currentCombination = new List<decimal>();
            
            FindCombinations(targetAmount, 0, currentCombination, result);
            
            return result;
        }

        /// <summary>
        /// Método recursivo para encontrar todas las combinaciones
        /// </summary>
        private static void FindCombinations(decimal remainingAmount, int denominationIndex, 
            List<decimal> currentCombination, List<List<decimal>> result)
        {
            // Si el monto restante es 0, encontramos una combinación válida
            if (Math.Round(remainingAmount, 2) == 0)
            {
                result.Add(new List<decimal>(currentCombination));
                return;
            }

            // Si el monto restante es negativo o no quedan denominaciones, no es válida
            if (remainingAmount < 0 || denominationIndex >= Denominaciones.Length)
                return;

            decimal currentDenomination = Denominaciones[denominationIndex];

            // Calcular cuántas veces puede usar esta denominación
            int maxUses = (int)(remainingAmount / currentDenomination);

            // Probar desde no usar esta denominación hasta usarla el máximo de veces
            for (int uses = 0; uses <= maxUses; uses++)
            {
                // Agregar las denominaciones actuales a la combinación
                for (int i = 0; i < uses; i++)
                {
                    currentCombination.Add(currentDenomination);
                }

                // Recursión con el siguiente índice de denominación
                FindCombinations(
                    Math.Round(remainingAmount - (uses * currentDenomination), 2), 
                    denominationIndex + 1, 
                    currentCombination, 
                    result
                );

                // Remover las denominaciones agregadas para probar la siguiente combinación
                for (int i = 0; i < uses; i++)
                {
                    currentCombination.RemoveAt(currentCombination.Count - 1);
                }
            }
        }

        // Método para testing y demostración
        public static void TestCases()
        {
            Console.WriteLine("=== CASO 2: MoneyParts ===");

            // Caso de prueba 1
            TestAmount("0.1");
            Console.WriteLine();

            // Caso de prueba 2
            TestAmount("0.15");
            Console.WriteLine();

            // Caso de prueba 3
            TestAmount("0.3");
            Console.WriteLine();

            // Caso de prueba 4
            TestAmount("1");
            Console.WriteLine();
        }

        private static void TestAmount(string amount)
        {
            try
            {
                var combinations = Build(amount);
                Console.WriteLine($"Monto: {amount}");
                Console.WriteLine($"Combinaciones encontradas: {combinations.Count}");
                
                foreach (var combination in combinations)
                {
                    var sortedComb = combination.OrderBy(x => x).ToList();
                    Console.WriteLine($"  [{string.Join(", ", sortedComb)}]");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error con monto {amount}: {ex.Message}");
            }
        }
    }
}