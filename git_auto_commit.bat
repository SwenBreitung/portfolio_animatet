@echo off
:: Überprüfen, ob eine Commit-Nachricht übergeben wurde
if "%1"=="" (
    echo Es muss eine Commit-Nachricht angegeben werden.
    exit /b 1
)

:: Verzeichnis wechseln (Pfad zu deinem Git-Repository anpassen)
cd D:\DeplodAkademi\Frontend\Portfolios\portfolio-new\portfolio1\portfolio
:: Änderungen zum Staging-Bereich hinzufügen
git add .

:: Commit mit der übergebenen Nachricht erstellen
git commit -m "%*"

:: Änderungen in das Remote-Repository pushen (auf den Branch main)
git push origin master

:: Pause, um die Ausgabe zu sehen
pause