---
layout:     post
title:      Nuts & bolts of applying deep learning - My experience 
date:       2018-03-14 12:39:55
summary:   
tags: tds
comments: true
---


Nuts & bolts of applying deep learning

Will update soon

<!--break-->

1. Traditional ratio of 60/20/20 % works well when you have less data like few thousands 10k, 20k images (in case of Computer vision). There may be cases when the split ratio is 99.5/0.4/0.1 % in cases of millions of images.

2. Often general rules and extensive experience of one domain does not help in another domain in choosing best set of hyperparameters.

3. Applied deep learning is more of Idea---->Code---->Test repeat

4. Data distribution should be same in Dev & Test sets.

5. Test Bias & Variance by Training & dev error rate.

![bias](/images/bias.png)
![bias](/images/variance.png)
in this case classifier actually underfits the data but then it does some weird things and overfits parts of the data as well. it somehow get flexibility in the middle and gets that odd example. In 2D this seems less obvious, but in high dimensional data, this is usually seen as part of training.

6. Bias variance detected, now how to mitigate them ?
High bias  --- Bigger network(mostly works, but increases computational time), Train longer, different NN architecture(may work)
High Variance ---- More Data, regularization, different NN architecture(may work)


