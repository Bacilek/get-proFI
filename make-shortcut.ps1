# Creates a "get-proFI" shortcut on the desktop that runs launch.bat (minimized console).
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$lnk = Join-Path ([Environment]::GetFolderPath('Desktop')) 'get-proFI.lnk'
$s = (New-Object -ComObject WScript.Shell).CreateShortcut($lnk)
$s.TargetPath = Join-Path $root 'launch.bat'
$s.WorkingDirectory = $root
$s.WindowStyle = 7
$s.Save()
Write-Output "Created $lnk"
