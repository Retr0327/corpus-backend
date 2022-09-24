function printGreen() {
    printf "\e[0;32m$1\e[0;m\n"
}

function printYellow() {
    printf "\e[0;33m$1\e[0;33m\n"
}

function generateIndex() {
    java -cp "./WEB-INF/lib/*" nl.inl.blacklab.tools.IndexTool $1 $2 ./tei-data/ ./formats/custom.blf.yaml
}

indexDir=./blacklab-indexes
teiDir=./tei-data


if ! [ "$(ls -A $teiDir)" ]; then
    printYellow 'There is no index to parse!'
    exit 1
fi


# if blacklab-indexes folder has indexes, use `add` command
if [ "$(ls -A $indexDir)" ]; then
    generateIndex "add" $indexDir
    printGreen "Blacklab indexes added at ${indexDir}"
else
    # if blacklab-indexes folder is empty, use `create` command
    generateIndex "create" $indexDir
    printGreen "Blacklab indexes created at ${indexDir}"
fi

# after indexing, remove the tei data
/bin/rm -f ./tei-data/*