!include nsDialogs.nsh

XPStyle on
Var /GLOBAL Dialog_1
Var /GLOBAL CheckBox_1
Var /GLOBAL Checkbox_State

;------------ uninstall custom page -----------------
UninstPage custom un.removeFiles un.removeFilesLeave

Function un.removeFiles

  nsDialogs::Create 1018
  Pop $Dialog_1

  ${If} $Dialog_1 == error
    Abort
  ${EndIf}

  ${NSD_CreateCheckbox} 0 20% 80% 20% "&Remove all configuration files including database and backups"
  Pop $CheckBox_1
  ${NSD_SetState} $CheckBox_1 $Checkbox_State

  nsDialogs::Show

FunctionEnd

Function un.removeFilesLeave
  ${NSD_GetState} $CheckBox_1 $Checkbox_State
  
  ${If} $Checkbox_State == 1
    MessageBox MB_YESNO "Are you sure you want to delete all configuration files including database and backups?" IDYES yes IDNO no 
    no: 
      Abort
    yes:
      Goto done
    done: 
  ${EndIf}
FunctionEnd

;------------ uninstall custom page end -----------------

!define FindProc_NOT_FOUND 1
!define FindProc_FOUND 0
!macro FindProc result processName
    ExecCmd::exec "%SystemRoot%\System32\tasklist /NH /FI $\"IMAGENAME eq ${processName}$\" | %SystemRoot%\System32\find /I $\"${processName}$\"" 
    Pop $0 ; The handle for the process
    ExecCmd::wait $0
    Pop ${result} ; The exit code
!macroend
 
Var /GLOBAL processFound

!macro customUnInstall
  !insertmacro FindProc $processFound "Ramot Group Income Outcome Management.exe"

  ${If} $processFound == true
    MessageBox MB_OK "You must quit the app Ramot Group Income Outcome Management before uninstallig" IDNO
    no:
  ${EndIf}

  ${if} $Checkbox_State == 1
    RMDir /r "$AppData\Ramot Group Data\config"
    RMDir /r "$AppData\Ramot Group Data\database"
    RMDir /r "$AppData\Ramot Group Data\logs"
    RMDir /r "$AppData\Ramot Group Data"
    RMDir /r "$AppData\Ramot Group Backups"
    RMDir /r "$AppData\ramot-group-income-outcome-management"
    RMDir /r "$LOCALAPPDATA\ramot-group-income-outcome-management-updater"
  ${EndIf}
!macroend