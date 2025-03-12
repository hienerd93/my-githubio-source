#!/bin/bash

file_list=$(find ../public -name '*.py' | sed 's|^\../||' | sed 's|.py$||' | awk '{printf "\"%s\",", $0}' | sed 's|,$||')
string_list="[$file_list]"
sed -i "s|^const buttons = .*|const buttons = $string_list;|" ../src/fetch.ts
