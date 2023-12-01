if [ -e $'./server/db.sqlite3' ]; then
  rm ./server/db.sqlite3 
  rm -r ./server/propertyhub/migrations/*
fi


rm -r ./server/media/properties/*