#!/bin/sh
set -e
FLAGS="--destination-dir=site"

echo "Building slides..."
asciidoctor-revealjs ${FLAGS} docs/*.adoc
echo "Done."
