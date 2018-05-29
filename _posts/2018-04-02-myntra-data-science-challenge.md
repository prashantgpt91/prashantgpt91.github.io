---
layout:     post
title:      Myntra challenge
date:       2018-04-02 03:43:57
summary:   
tags: tds
comments: true
---

I Participated in Myntra Data Science Challenge. The challenge was about predicting the graphic type of T-shirt given the image of T-shirt. From Business point of view, Knowing that in e-commerce industry, there is a lot of dead-stock, this can be used to rotate products in Inventory thereby reducing loss to company and enhance customer experience as well by giving them enough options to choose from latest trendy T-shirts that people are wearing in Social Media.


Here are the summary from the Webinar by Mr. Anoop from Myntra. Accidentally, I just saw webinar on 2nd April'18.


1. How to deal with skewed data distribution? - Image Augmentation.

2. The Accuracy should be seen per class i.e... Confusion matrix should be built for each class rather than overall data, since overall data is badly skewed in an extreme case of 0.4% to 40%

3. A class can be embedded into another class. Like Humour style T-shirts could be embedded into Geometry style T-shirts (Tom & Jerry in a triangle shape). In this case prefer to output a class which is more visble i.e.. Humour in this case.

4. There is a General Class called `Graphic`, which is like if you don't know precisely which class to identify, pick `Graphics` class just like `Others` class.

5. Localisation can be done to crop the image and get only the T-shirt part of it i.e.. cut the faces, because in some images, there were multiple people standing. Even boy/girl face could introduce bias.

6. Multi-class labels are not allowed. Choose the one with maximum confidence.

7. No metadata should be used to do classification. Input is ony an image and the output should be label.

8. Since the data distribution, is same in Train/test/valid, we can choose to ignore classes with like 1 sample i.e.. Horizontal Stripe.








