---
author: prashant
comments: true
date: 2016-08-23 06:24:44+00:00
layout: post
redirect_from: /2016/08/machine-learning
slug:
title: Kaggle Machine Learning Approach
wordpress_id: 1074
tags:
- business
- engineering
- machine-learning
---

An average data scientist deals with loads of data daily. Some say over 60-70% time is spent in data cleaning, munging and bringing data to a suitable format such that machine learning models can be applied on that data. This post focuses on the second part,








i.e., applying machine learning models, including the preprocessing steps. The pipelines discussed in this post come as a result of over a hundred machine learning competitions that I’ve taken part in. It must be noted that the discussion here is very general but very useful and there can also be very complicated methods which exist and are practised by professionals.

We will be using python!



## Data


Before applying the machine learning models, the data must be converted to a tabular form. 
This whole process is the most time consuming and difficult process and is depicted in the figure below.


![imagesample](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/07/abhishek_1.png)


The machine learning models are then applied to the tabular data. Tabular data is most common way of representing data in machine learning or data mining. We have a data table, rows with different samples of the data or X and labels, y. The labels can be single column or multi-column, depending on the type of problem. We will denote data by X and labels by y.

## Types of labels

The labels define the problem and can be of different types, such as:

- Single column, binary values (classification problem, one sample belongs to one class only and there are only two classes)
- Single column, real values (regression problem, prediction of only one value)
- Multiple column, binary values (classification problem, one sample belongs to one class, but there are more than two classes)
- Multiple column, real values (regression problem, prediction of multiple values)
- And multilabel (classification problem, one sample can belong to several classes)


## Evaluation Metrics

For any kind of machine learning problem, we must know how we are going to evaluate our results, or what the evaluation metric or objective is. For example in case of a skewed binary classification problem we generally choose area under the receiver operating characteristic curve (ROC AUC or simply AUC). In case of multi-label or multi-class classification problems, we generally choose categorical cross-entropy or multiclass log loss and mean squared error in case of regression problems.

I won’t go into details of the different evaluation metrics as we can have many different types, depending on the problem.


## The Libraries

To start with the machine learning libraries, install the basic and most important ones first, for example, numpy and scipy.

- To see and do operations on data: pandas (http://pandas.pydata.org/)
- For all kinds of machine learning models: scikit-learn (http://scikit-learn.org/stable/)
- The best gradient boosting library: xgboost (https://github.com/dmlc/xgboost)
- For neural networks: keras (http://keras.io/)
- For plotting data: matplotlib (http://matplotlib.org/)
- To monitor progress: tqdm (https://pypi.python.org/pypi/tqdm)
- I don’t use Anaconda (https://www.continuum.io/downloads). It’s easy and does everything for you, but I want more freedom. The choice is yours.


## The Machine Learning Framework

In 2015, I came up with a framework for automatic machine learning which is still under development and will be released soon. For this post, the same framework will be the basis. The framework is shown in the figure below:

![imagetag](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/07/abhishek_2.png)


In the framework shown above, the pink lines represent the most common paths followed. After we have extracted and reduced the data to a tabular format, we can go ahead with building machine learning models.

The very first step is identification of the problem. This can be done by looking at the labels. One must know if the problem is a binary classification, a multi-class or multi-label classification or a regression problem. After we have identified the problem, we split the data into two different parts, a training set and a validation set as depicted in the figure below.


![imagetag](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/07/abhishek_3.png)


The splitting of data into training and validation sets “must” be done according to labels. In case of any kind of classification problem, use stratified splitting. In python, you can do this using scikit-learn very easily.


![imagetag](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/07/abhishek_4.png)


In case of regression task, a simple K-Fold splitting should suffice. There are, however, some complex methods which tend to keep the distribution of labels same for both training and validation set and this is left as an exercise for the reader.


![imagetag](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/07/abhishek_5.png)


I have chosen the eval_size or the size of the validation set as 10% of the full data in the examples above, but one can choose this value according to the size of the data they have.

After the splitting of the data is done, leave this data out and don’t touch it. Any operations that are applied on training set must be saved and then applied to the validation set. Validation set, in any case, should not be joined with the training set. Doing so will result in very good evaluation scores and make the user happy but instead he/she will be building a useless model with very high overfitting.

Next step is identification of different variables in the data. There are usually three types of variables we deal with. Namely, numerical variables, categorical variables and variables with text inside them. Let’s take example of the popular Titanic dataset (https://www.kaggle.com/c/titanic/data).


![imageurl](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/07/abhishek_6.png)


Here, survival is the label. We have already separated labels from the training data in the previous step. Then, we have pclass, sex, embarked. These variables have different levels and thus they are categorical variables. Variables like age, sibsp, parch, etc are numerical variables. Name is a variable with text data but I don’t think it’s a useful variable to predict survival.

Separate out the numerical variables first. These variables don’t need any kind of processing and thus we can start applying normalization and machine learning models to these variables.

There are two ways in which we can handle categorical data:

- Convert the categorical data to labels

![imgaetag](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/07/abhishek_7.png)

- Convert the labels to binary variables (one-hot encoding)

![imagetag](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/07/abhishek_8.png)


Please remember to convert categories to numbers first using LabelEncoder before applying OneHotEncoder on it.

Since, the Titanic data doesn’t have good example of text variables, let’s formulate a general rule on handling text variables. We can combine all the text variables into one and then use some algorithms which work on text data and convert it to numbers.

[Source](http://blog.kaggle.com/2016/07/21/approaching-almost-any-machine-learning-problem-abhishek-thakur/)
