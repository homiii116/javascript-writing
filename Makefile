MD_FILES := $(shell find ./articles -not \( -path ./node_modules -prune \) -type f -name '*.md')
HTML_FILES := $(patsubst %.md,%.html,$(MD_FILES))

.PHONY:
all: $(HTML_FILES)
	@echo "終わったんだ"

%.html: %.md
	node convert.js $< > $@
	
.PHONY:
live:
	node live.js

.PHONY:
clean:
	find ./articles -not \( -path ./node_modules -prune \) -type f -name '*.html' -exec rm {} \;