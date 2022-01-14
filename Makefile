MD_FILES := $(shell find . -not \( -path ./node_modules -prune \) -type f -name '*.md')
HTML_FILES := $(patsubst %.md,%.html,$(MD_FILES))

.PHONY:
all: $(HTML_FILES)
	@echo "終わったんだ"

%.html: %.md
	./node_modules/.bin/marked $< | node convert.js > $@
	
.PHONY:
clean:
	find . -not \( -path ./node_modules -prune \) -type f -name '*.html' -exec rm {} \;