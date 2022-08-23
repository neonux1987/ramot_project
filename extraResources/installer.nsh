!include "MUI2.nsh"
  !include nsDialogs.nsh
  !include LogicLib.nsh

Name nsDialogs
OutFile nsDialogs.exe
XPStyle on

  Var Dialog
  Var Checkbox
  Var CheckboxValue

  ;------------ uninstall custom page -----------------
  UninstPage custom un.removeFiles un.removeFilesLeave

  Function .onInit
   StrCpy $CheckboxValue ${BST_UNCHECKED} ; Set initial/default state
  FunctionEnd

  Function un.removeFiles

    nsDialogs::Create 1018
    Pop $Dialog

    ${If} $Dialog == error
      Abort
    ${EndIf}

    ${NSD_CreateCheckbox} 0 20% 80% 20% "&Remove all configuration files including database and backups"
    Pop $Checkbox
    ${NSD_SetState} $Checkbox $CheckboxValue

    nsDialogs::Show

  FunctionEnd

  Function un.removeFilesLeave
    ${NSD_GetState} $Checkbox $CheckboxValue
    
    ${If} $CheckboxValue == 1
      MessageBox MB_YESNO "Are you sure you want to delete all configuration files including database and backups?" IDYES yes IDNO no 
      no: 
        Abort
      yes:
        Goto done
      done: 
    ${EndIf}
  FunctionEnd

  Section

  ${if} $CheckboxValue == 1
    RMDir /r "$AppData\Ramot Group Data\config"
    RMDir /r "$AppData\Ramot Group Data\database"
    RMDir /r "$AppData\Ramot Group Data\logs"
    RMDir /r "$AppData\Ramot Group Data"
    RMDir /r "$AppData\Ramot Group Backups"
    RMDir /r "$AppData\ramot-group-income-outcome-management"
    RMDir /r "$LOCALAPPDATA\ramot-group-income-outcome-management-updater"
  ${EndIf}

  SectionEnd

  ;------------ uninstall custom page end -----------------

!macro customUnInstall

  MessageBox MB_OK "Test output 1"

!macroend

!insertmacro customUnInstall