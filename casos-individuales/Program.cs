using System;
using CasosIndividuales;

namespace TestCasos
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== DESAFÍO TÉCNICO .NET - CASOS INDIVIDUALES ===\n");

            if (args.Length == 0)
            {
                MostrarAyuda();
                return;
            }

            string comando = args[0].ToLower();

            switch (comando)
            {
                case "orderrange":
                case "or":
                    EjecutarOrderRange(args);
                    break;
                case "moneyparts":
                case "mp":
                    EjecutarMoneyParts(args);
                    break;
                case "test":
                    EjecutarTodos();
                    break;
                case "help":
                case "-h":
                case "--help":
                    MostrarAyuda();
                    break;
                default:
                    Console.WriteLine($"Comando desconocido: {comando}");
                    MostrarAyuda();
                    break;
            }
        }

        static void MostrarAyuda()
        {
            Console.WriteLine("Uso: dotnet run <comando> [argumentos]");
            Console.WriteLine();
            Console.WriteLine("Comandos disponibles:");
            Console.WriteLine("  orderrange, or <números>     - Ejecutar OrderRange con números separados por comas");
            Console.WriteLine("  moneyparts, mp <monto>       - Ejecutar MoneyParts con un monto específico");
            Console.WriteLine("  test                         - Ejecutar todos los casos de prueba");
            Console.WriteLine("  help, -h, --help            - Mostrar esta ayuda");
            Console.WriteLine();
            Console.WriteLine("Ejemplos:");
            Console.WriteLine("  dotnet run orderrange 5,2,8,1,9,4");
            Console.WriteLine("  dotnet run or 10,15,20,25");
            Console.WriteLine("  dotnet run moneyparts 0.15");
            Console.WriteLine("  dotnet run mp 1.5");
            Console.WriteLine("  dotnet run test");
        }

        static void EjecutarOrderRange(string[] args)
        {
            if (args.Length < 2)
            {
                Console.WriteLine("Error: Debes proporcionar números separados por comas");
                Console.WriteLine("Ejemplo: dotnet run orderrange 5,2,8,1,9");
                return;
            }

            try
            {
                string input = args[1];
                var numeros = input.Split(',')
                    .Select(s => int.Parse(s.Trim()))
                    .ToArray();

                Console.WriteLine("=== CASO 1: OrderRange ===");
                Console.WriteLine($"Input: [{string.Join(", ", numeros)}]");

                var resultado = OrderRange.Build(numeros);

                Console.WriteLine($"Pares: [{string.Join(", ", resultado.Pares)}]");
                Console.WriteLine($"Impares: [{string.Join(", ", resultado.Impares)}]");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        static void EjecutarMoneyParts(string[] args)
        {
            if (args.Length < 2)
            {
                Console.WriteLine("Error: Debes proporcionar un monto");
                Console.WriteLine("Ejemplo: dotnet run moneyparts 0.15");
                return;
            }

            try
            {
                string monto = args[1];
                
                Console.WriteLine("=== CASO 2: MoneyParts ===");
                Console.WriteLine($"Monto: {monto}");
                Console.WriteLine("Denominaciones disponibles: [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200]");

                var combinaciones = MoneyParts.Build(monto);

                Console.WriteLine($"Combinaciones encontradas: {combinaciones.Count}");
                Console.WriteLine("Todas las combinaciones:");

                for (int i = 0; i < combinaciones.Count; i++)
                {
                    var combinacion = combinaciones[i].OrderBy(x => x).ToList();
                    Console.WriteLine($"  {i + 1}: [{string.Join(", ", combinacion)}]");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        static void EjecutarTodos()
        {
            Console.WriteLine("=== EJECUTANDO TODOS LOS CASOS DE PRUEBA ===\n");
            
            OrderRange.TestCases();
            Console.WriteLine();
            MoneyParts.TestCases();
        }
    }
}