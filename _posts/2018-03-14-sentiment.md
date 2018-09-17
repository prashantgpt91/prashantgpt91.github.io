---
layout:     post
title:      Sentimental Analysis
categories: blog 
tags: natural language processing
---

Sample sentence 1

<script src="https://gist.github.com/x0v/53d644f0d78b009d5802334a4e9fd726.js"></script>

Sample Sentence 2
<script src="https://gist.github.com/x0v/36fedf434781e93dfe21e3b3d31eb4d6.js"></script>

<!--break-->

Since these are really long, let’s instead gain some insight by looking at the Wordclouds formed by combining the positive and negative reviews:


Generate word cloud

<script src="https://gist.github.com/x0v/f44ef75b2ad2c6ae9d75ea3e86f71731.js"></script>


 A wordcloud is a pretty common visualization in textual data, where word sizes are proportional to their occurences in the data. So, it is really handy to visualize, occurences of words keeping in mind their sentiments.

| ![space-5.jpg](/images/313.png) | 
|:--:| 
| *Extremely Negative* |

| ![space-1.jpg](/images/312.png) | 
|:--:| 
| *Negative* |


| ![space-2.jpg](/images/314.png) | 
|:--:| 
| *Neutral* |


| ![space-3.jpg](/images/315.png) | 
|:--:| 
| *Positive* |

| ![space-4.jpg](/images/316.png) | 
|:--:| 
| *Extremely Positive* |


we can clearly infer from the Wordclouds, the sentiment expressed, starting from high counts of bad in the extremely negative cloud to best in the extremely positive cloud.


We will be using the following metrics to benchmark our performance:

1. Accuracy

2. Confusion Matrix


Before we start on anything in NLP, data cleansing is very important.
See this post for data cleansing.


### Approaches

Simple Dictionary Lookup

A classical technique for sentiment analysis, dictionary based lookups have recieved tons of criticism for being inexhaustive, ignoring semantic meaning and many others. Yet, they were amongst the first and simplest techniques to be applied.

The steps are simple:

1. Have a dictionary with a key-value pair as word:score, where score should be positive for positive words and negative for negative words.
2. Start iterating through a given review word by word with a score counter of 0.
3. If the word being considered is present in the dictionary, add its score to the score counter.
4. The final value of the score counter and the end of the review determines the label to be assigned.

| ![space.jpg](/images/DBSA.png) | 
|:--:| 
| *Extremely Positive* |


For this model we have used the [AFINN dictionary](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010)

<script src="https://gist.github.com/x0v/2efe9ab0fa2e26ce7763e24017e15c68.js"></script>

Finally, if your looking for a list of the best additional dictionaries to experiment with you can check this [link](https://stackoverflow.com/questions/4188706/sentiment-analysis-dictionaries).


Bag of Words Approach(BOW)
What is Bag of words? [Read here](https://imprashant.com/blog/2017/12/bag-of-words/)

Doing sentimental Analysis with BOW

<script src="https://gist.github.com/x0v/e1e522ef6f3c7dd48c3c0a2b1fff2c42.js"></script>




