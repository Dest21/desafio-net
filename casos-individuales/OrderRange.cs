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

        // Método para testing y demostración
        public static void TestCases()
        {
            Console.WriteLine("=== CASO 1: OrderRange ===");

            // Caso de prueba 1
            var test1 = new int[] { 2, 1, 4, 5 };
            var result1 = Build(test1);
            Console.WriteLine($"Input: [{string.Join(",", test1)}]");
            Console.WriteLine($"Pares: [{string.Join(",", result1.Pares)}]");
            Console.WriteLine($"Impares: [{string.Join(",", result1.Impares)}]");
            Console.WriteLine();

            // Caso de prueba 2
            var test2 = new int[] { 10, 3, 8, 1, 7, 6, 2, 9 };
            var result2 = Build(test2);
            Console.WriteLine($"Input: [{string.Join(",", test2)}]");
            Console.WriteLine($"Pares: [{string.Join(",", result2.Pares)}]");
            Console.WriteLine($"Impares: [{string.Join(",", result2.Impares)}]");
            Console.WriteLine();

            // Caso de prueba 3 - Solo pares
            var test3 = new int[] { 2, 4, 6, 8 };
            var result3 = Build(test3);
            Console.WriteLine($"Input: [{string.Join(",", test3)}]");
            Console.WriteLine($"Pares: [{string.Join(",", result3.Pares)}]");
            Console.WriteLine($"Impares: [{string.Join(",", result3.Impares)}]");
            Console.WriteLine();

            // Caso de prueba 4 - Solo impares
            var test4 = new int[] { 1, 3, 5, 7 };
            var result4 = Build(test4);
            Console.WriteLine($"Input: [{string.Join(",", test4)}]");
            Console.WriteLine($"Pares: [{string.Join(",", result4.Pares)}]");
            Console.WriteLine($"Impares: [{string.Join(",", result4.Impares)}]");
        }
    }
}