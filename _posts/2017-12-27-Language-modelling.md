---
layout:     post
title:      Language Modelling in NLP
categories: blog  
tags: natural language processing
---


#### What is Language Modelling ?

Language modeling in very simple terms is the task of assigning a probability to sentences in a language. Besides assigning a probability to each sequence of words, the language models also assigns a probability for the likelihood of a given word (or a sequence of words) to follow a sequence of words.

<!--break-->

#### Why on earth would we want to assign a probability to a sentence ?

There are numerous applications of language modelling in various applications of NLP.
for ex in Speech recognition.

		recognize speech
		wreck a nice beach

There exists an acoustic ambiguity here and language modelling can help us better predict the output by verifying which sentence is most likely to occur. In language modelling, sentences which are more likely to occur should have a higher probability than those which are less likely to occur. And at the end of the day, building such a model is our Objective. Infact Speech recognition was the original motivation for studying language models.


To build a language model, we need to understand Markov Process. Even before that let us know what is joint probability?

> A joint probability is a statistical measure where the likelihood of two events occurring together and at the same point in time are calculated. Joint probability is the probability of event Y occurring at the same time event X occurs.

> Conditional probability of an event B is the probability that the event will occur given the knowledge that an event A has already occurred.

> Chain rule permits the calculation of any member of the joint distribution of a set of random variables using only conditional probabilities. 

[Read this](https://www.ibm.com/developerworks/community/blogs/nlp/entry/the_chain_rule_of_probability?lang=en) to get a better understanding

We use Markov process to reduce the complexity of n-gram modelling because of huge vocabulary size. 

#### Trigram Language model:
For the sentence

	`the dog barks STOP`

we would have

	p(the dog barks STOP) = q(the | *, *)

				x q(dog | *, the)

				x q(barks | the ,dog)

				x q(STOP | dog, barks)


This trigram language model is build on Second order markov process with variable length. Next comes the estimation of q probabilities.	Again due to large vocabulary size, Interpolation methods are used.


#### Evaluate language models: Perplexity






Check out complete lecture notes here.

<iframe src="https://drive.google.com/file/d/1gQDlKnLRyGrJwlOq1eHx_v9IiGOlkfvC/preview" width="740" height="480"></iframe>



