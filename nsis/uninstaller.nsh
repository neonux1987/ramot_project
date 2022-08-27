!include nsDialogs.nsh
!include "MUI2.nsh"

XPStyle on
Var /GLOBAL Dialog_1
Var /GLOBAL CheckBox_1
Var /GLOBAL Checkbox_State
Var /GLOBAL processFound

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

  

  ${If} $processFound == 0
    MessageBox MB_OK "The app Ramot Group Income Outcome Management is still running. you must quit it before uninstalling" IDOK ok
    ok: 
    Abort
  ${EndIf}
FunctionEnd

;------------ uninstall custom page end -----------------

!macro customRemoveFiles
  SetShellVarContext current
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
