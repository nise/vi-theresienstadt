git add .
if zenity --entry \
--title="Commit Message" \
--text="Enter a commit message" \
--entry-text "Neues Profil"
then git commit -m $?; #git push origin master
  else echo "You did not provide a commit message. Commit and push failed."
fi
