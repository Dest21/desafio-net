using System;
using System.Collections.Generic;
using System.Linq;

namespace CasosIndividuales
{
    /// <summary>
    /// CASO 1: OrderRange - Separar números pares e impares ordenados ascendentemente
    /// </summary>
    public class OrderRange
    {
        public class RangeResult
        {
            public List<int> Pares { get; set; } = new List<int>();
            public List<int> Impares { get; set; } = new List<int>();
        }

        /// <summary>
        /// Separa una colección de enteros en pares e impares, ordenándolos ascendentemente
        /// </summary>
        /// <param name="numbers">Colección de números enteros</param>
        /// <returns>Objeto con las listas de pares e impares ordenadas</returns>
        /// <example>
        /// Input: [2,1,4,5]
        /// Output: pares=[2,4], impares=[1,5]
        /// </example>
        public static RangeResult Build(IEnumerable<int> numbers)
        {
            if (numbers == null)
                throw new ArgumentNullException(nameof(numbers));

            var result = new RangeResult();

            // Separar pares e impares
            var pares = numbers.Where(n => n % 2 == 0).OrderBy(n => n).ToList();
            var impares = numbers.Where(n => n % 2 != 0).OrderBy(n => n).ToList();

            result.Pares = pares;
            result.Impares = impares;

            return result;
        }
    }
}