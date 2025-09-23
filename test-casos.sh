#!/bin/bash

echo "=== DESAFIO TECNICO .NET - CASOS INDIVIDUALES ==="
echo

if [ $# -eq 0 ]; then
    echo "Uso: ./test-casos.sh <comando> [argumentos]"
    echo
    echo "Comandos disponibles:"
    echo "  orderrange <numeros>     - Ejecutar OrderRange con numeros separados por comas"
    echo "  moneyparts <monto>       - Ejecutar MoneyParts con un monto especifico"
    echo "  test                     - Ejecutar todos los casos de prueba"
    echo
    echo "Ejemplos:"
    echo "  ./test-casos.sh orderrange 5,2,8,1,9,4"
    echo "  ./test-casos.sh moneyparts 0.15"
    echo "  ./test-casos.sh test"
    exit 0
fi

cd casos-individuales
dotnet run "$@"