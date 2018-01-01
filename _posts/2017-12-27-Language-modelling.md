---
layout:     post
title:      Language Modelling in NLP
date:       2017-12-27 04:19:57
summary:   
tags: nlp
comments: true
---


#### What is Language Modelling ?

Language modeling in very simple terms is the task of assigning a probability to sentences in a language. Besides assigning a probability to each sequence of words, the language models also assigns a probability for the likelihood of a given word (or a sequence of words) to follow a sequence of words.

<!--break-->

#### Why on earth would we want to assign a probability to a sentence ?

There are numerous applications of language modelling in various applications of NLP.
for ex in Speech recognition.

		recognize speech
		wreck a nice beach

There exists an acoustic ambiguity here and language modelling can help us better predict the output by verifying which sentence is most likely to occur. In language modelling, sentences which are more likely to occur should have a higher probability than those which are less likely to occur. And at the end of the day, building such a model is our Objective.


To build a language model, we need to understand Markov Process.


Check out complete lecture notes here.

<iframe src="https://drive.google.com/file/d/1gQDlKnLRyGrJwlOq1eHx_v9IiGOlkfvC/preview" width="740" height="480"></iframe>



