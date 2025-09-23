@echo off
echo === DESAFIO TECNICO .NET - CASOS INDIVIDUALES ===
echo.

if "%1"=="" (
    echo Uso: test-casos.bat ^<comando^> [argumentos]
    echo.
    echo Comandos disponibles:
    echo   orderrange ^<numeros^>     - Ejecutar OrderRange con numeros separados por comas
    echo   moneyparts ^<monto^>       - Ejecutar MoneyParts con un monto especifico
    echo   test                      - Ejecutar todos los casos de prueba
    echo.
    echo Ejemplos:
    echo   test-casos.bat orderrange 5,2,8,1,9,4
    echo   test-casos.bat moneyparts 0.15
    echo   test-casos.bat test
    goto :eof
)

cd casos-individuales
dotnet run %*