#!/bin/sh
set -e
FLAGS="--destination-dir=site -a revealjsdir=https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.6.0"

echo "Building slides..."
asciidoctor-revealjs ${FLAGS} docs/*.adoc
echo "Done."
