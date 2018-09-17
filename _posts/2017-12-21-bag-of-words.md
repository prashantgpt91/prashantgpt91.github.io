---
layout:     post
title:      All you need to know about BOW
categories: blog  
tags: natural language processing

---

Feature Extraction from texts using **Bag of words**

The bag of words model ignores grammar and order of words.
‘All my cats in a row’,
‘When my cat sits down, she looks like a Furby toy!’,

Breaking down the given sentences into words and assigning them each a unique ID

<!--break-->

`{‘all’: 0, ‘cat’: 1, ‘cats’: 2, ‘down’: 3, ‘furby’: 4, ‘in’: 5, ‘like’: 6, ‘looks’: 7, ‘my’: 8, ‘row’: 9, ‘she’: 10, ‘sits’: 11, ‘toy’: 12, ‘when’: 13 }`

In total we have 14 words in our Vocabulary. That’s why every document will be represented by a feature vector of 14 elements. The number of elements is called the dimension.

Then we can express the sentences as numeric vectors:

```
[[1 0 1 0 0 1 0 0 1 1 0 0 0 0]
[0 1 0 1 1 0 1 1 1 0 1 1 1 1]]
```

‘All my cats in a row’ = `[1 0 1 0 0 1 0 0 1 1 0 0 0 0]`

It is not necessary that sentences vocabulary will be in alphabetical order.

for ex:

```
corpus = [
    'All my cats in a row',
    'The cat from outer space',
    'I love to walk but i '
]
```
```
[[1 0 0 1 0 1 0 1 0 1 0 0 0 0]
 [0 0 1 0 1 0 0 0 1 0 1 1 0 0]
 [0 1 0 0 0 0 1 0 0 0 0 0 1 1]]
```
Sample Vocabulary

```{u'all': 0, u'from': 4, u'space': 10, u'but': 1, u'cat': 2, u'to': 12, u'cats': 3, u'in': 5, u'love': 6, u'outer': 8, u'walk': 13, u'my': 7, u'the': 11, u'row': 9}```


<script src="https://gist.github.com/x0v/9cdda9c388f6161ab78c9d0709a74ee9.js"></script>

See [Gist](https://gist.github.com/x0v/9cdda9c388f6161ab78c9d0709a74ee9) for outputs as well.