---
layout:     post
title:      System design
date:       2018-01-08 12:22:57
summary:   
tags: backend
comments: true

---

### Table of contents
1. [Software Design Theoritical concepts - Introduction](#id1)
	1. [CRC Card](#sub1id1)
	2. [Four concepts revolving around OOP](sub2id1)
	2. [Coupling & Cohesion](#sub3id1)
	3. [Separation of concerns](#sub4id1)
	4. [SOLID](#sub5id1)
		1. [The Single Responsibility Principle](#sub1sub5id1)
		2. [The Open Closed Principle](#sub2sub5id1)
		3. [The Liskov Substitution Principle](#sub3sub5id1)
		4. [The Interface Segretation Principle](#sub4sub5id1)
		5. [The Dependency Inversion Principle](#sub5sub5id1)
2. [Class Diagrams](#id2)
	1. [Tool to draw UML](sub1id2)
	2. [UML class diagram rules](sub2id2)
3. [Sample UML Diagrams examples](#id3)
4. [Object oriented cheat-sheet](#id4)
5. [References](#id5)

<!--break-->

### Introduction <a name="id1"></a>
System Design is an art. And this is my consistent effort to improve myself with solid foundations of various principles.


### What is a CRC card ? <a name="sub1id1"></a>
Class - Rresponsibility - Collaborators Cards
CRC Cards provide a quick, low-investment and collaborative way to design and model objects
in an Object-Oriented system. CRC Cards are written on index cards, divided into 3 sections,
as in the template below.

When talking to stakeholders, CRC cards are the best way to discuss the requirements specifications without going into much technical details. The technical details could be covered in Class Diagrams, left further to discuss with developers.

<iframe src="https://drive.google.com/file/d/1Ow0pvbQb0_35-TcvMqbtBgK5r6a7KJHp/preview" width="640" height="480"></iframe>

### Major Goals of Software Design <a name="sub2id1"></a>

1. Abstraction
2. Encapsulation
3. Decomposition
4. Generalization


### Coupling & Cohesion (a way to evaluate software design complexity) <a name="id2"></a>
Coupling is a measure that defines the level of inter-dependability among modules of a program. It tells at what level the modules interfere and interact with each other. The lower the coupling, the better the program.

Cohesion is a measure that defines the degree of intra-dependability within elements of a module. The greater the cohesion, the better is the program design.

### Separation of concerns <a name="id3"></a>
Concerns are the different aspects of software functionality. For instance, the "business logic" of software is a concern, and the interface through which a person uses this logic is another.
The separation of concerns is keeping the code for each of these concerns separate. Changing the interface should not require changing the business logic code, and vice versa.

Model-View-Controller (MVC) design pattern is an excellent example of separating these concerns for better software maintainability.
The HTML file (possibly XML) defines the document structure. The CSS file defines how the document is presented on your screen.

### Information Hiding
access modifiers:
1. private
2. public
3. protected
4. default or no access



### The Principles of Object Oriented Design.(SOLID) <a name="id4"></a>


The principles of object oriented design are condensed under the famous and catchy acronym of
acronyms SOLID which stands for:


-  S &ndash; The Single Responsibility Principle (SRP)

-  O- The Open Closed Principle (OCP)

-  L &ndash; The Liskov Substitution Principle (LSP)

-  I &ndash; The Interface Segretation Principle (ISP)

-  D &ndash; The Dependency Inversion Principle (DIP)


These principles represent a set of rules that allows us to improve the way we design and set up the
dependencies between our classes and, in term, allow us to create more flexible, reusable and robust code.


### The Single Responsibility Principle <a name="sub1id4"></a>


> “A class should have one, and only one, reason to change or,there should never be more than one reason for a class to change.”**Robert C. Martin**



This principle is based upon the fact that whenever a class handles more than one responsibility then
there will be more than one reason for it to change. The consequences are pretty clear, if we need
to change a given class for a number of different reasons, then this class is not going to be robust nor
easy to maintain. In this case, there is what we call a coupling of responsibilities that will lead to a
number of problems: modifying one of them, may have a negative effect on the others, it will imply
the need to recompile code that wouldn’t be necessary if the responsibilities were decoupled, and
it will allow the client of the class to access other responsibilities which it might not care for, are just
some examples.


Applying this principle, may be hard at first, as we usually tend to group functionalities within our
classes in the abstraction phase of our development cycle, but it is a great guideline nonetheless
when we refactor. Use this principle, and you’ll end up with smaller, well-defined, robust and
maintainable classes.


An example of a SRP violation could be a given Rectangle class which has a Draw method and
a CalculateArea method. In this context, the class is handling two responsibilities, it has two
reasons to change and thus is violating SRP. A way to decouple these responsibilities would be to
extract separate interfaces, and make the clients depend upon these interfaces.


### The Open Closed Principle <a name="sub2id4"></a>

> “You should be able to extend a class behavior, without modifyingit.or,A class should be open for extension but closed tomodification.”**Robert C. Martin and Bertrand Meyer**



If you have been working in any brand of software development for any reasonable amount of time
you’ll have notice that one thing that characterises most projects is that your software, for one
reason or another, is going to change during its life cycle. Thus, it is pretty important to design your
software so it will be flexible (i.e. receives changes well) but also so it is robust (it doesn’t break, a
single change doesn’t result in an endless chain of changes). The Open Closed Principle does just
that, it leads our efforts when tackling this particular problem, saying that, whenever our application
needs changes, we should never modify old code that already works and is tested, but extend it with
brand new functionalities and code.


The Open Closed Principle is comprised by two main concepts or corollaries:


-   A class should be open for extension, which basically means that you should be able to
extend the behavior or functionality of this given class.

-   A class should be closed for modification, which means that you should never modify the
existing code of a class


But how do we obtain classes that adhere to the OCP? How do we achieve this? The answer is
through abstraction. Using interfaces or abstract classes we can define a fixed contract to follow
whilst being able to extend the behavior with as many implementations of those interfaces as we
want or need. It is to be noted though, that designing a class that is completely closed to any possible
change, it is quite an impossible task. Most of the times, you’ll have to decide strategically which kind
of changes your class will be prepared to handle (strategic closure).


As Robert C. Martin states, there are a great number of heuristics and common practices we use
daily that derive directly from this principle. For instance, never use global variables, as no module
that depends on a given global variable can be closed in relation to other module that might write
into it. Also, making all members of a class private (alas encapsulation) prevents others classes from
depending on these members and thus closes them.


As a last note of interest, although I have been mainly talking about classes, you should know that


you can apply the OCP not only to classes, but to any software entity that you can think of, methods,
modules, anything. Use this principle, and you’ll improve the maintainability of your code drastically.


### The Liskov Substitution Principle <a name="sub3id4"></a>


> “Derived classes must be substitutable for their base classes or,What is wanted here is something like the following substitutionproperty: If for each object o1 of type S there is an object o2 oftype T such that for all programs P defined in terms of T, thebehavior of P is unchanged when o1 is substituted for o2 then S isa subtype of T.”**Robert C. Martin and Barbara Liskov**


As mentioned in the previous section, we make use of abstractions (and polymorphism) to let our
classes adhere to the Open-Closed Principle. In order to make a proper use of inheritance, so our
derived classes will still subscribe to OCP, we guide ourselves by the Liskov Substitution Principle.


The whole point here is that a derived class should work as expected i.e. should behave (at a
minimum common denominator) as portrayed by the base class, so that, classes or methods that
have a reference to the base class, will be able to use instances of the derived classes without being
aware of it(thus avoiding hard-coded dependencies).


If you listen to Hanselminutes podcast featuring Robert C. Martin, Robert puts the classical example
of the Rectangle base class and the Square class that derives from it. So you have a Rectangle class
in your application, and you want to use a new Square class, so you think&hellip; well a Square &ldquo;is-a&rdquo;
Rectangle isn’t it? (it just has the same width and height) So you make it derive from the Rectangle
class and wire it up so when you set the width, the height will be set as well and vice versa. Bang!
Problem is that another developer that is working with Rectangles, doesn’t need to know what
Rectangles really are at runtime, but still expects them to behave according to the base class
definition. In this case, Square doesn’t conform to LSP and may end up causing problems based on
unfulfilled assumptions. The point here is that, while it is a valid logical premise to relate a square
with a rectangle, it might not be as useful from a code perspective. This example is also known as the
circle-ellipse problem.


This was a pretty subtle violation of LSP. However, in practice, any time you use the common switch
statement to check the type of an object at runtime in order to do this or that, you are violating LSP
and OCP (new derived types will force you to modify that switch block).


### The Interface Segregation Principle <a name="sub4id4"></a>


> “Make fine grained interfaces that are client specific or, Clientsshould not be forced to depend upon interfaces that they do notuse”**Robert C. Martin**


This principle may be one of the least importance due to its very focused field of application: fat
interfaces. The whole point is that, when we have a class that has a fat interface (an interface with


a lot of methods) and a series of clients that depend upon this interface, we should refactor our
solution so that, any given client only depends on a new interface that comprises only those methods
of the original interface that the client needs to use. This is, the solution is to group the methods of
the fat interface, into smaller and more cohesive interfaces.


The problem of using fat non-cohesive interfaces is that, they create a coupling between its clients,
i.e. a given client may force changes on the interface that will impact another client even if they use
non-related methods. Again, the solution to this problem is to extract smaller interfaces for each
client to depend upon. This way, changes will be more contained and decoupled, as clients will only
depend on their respective interfaces.


### The Dependency Inversion Principle <a name="sub5id4"></a>

> “Depend on abstractions, not on concretions or, A. High levelmodules should not depend upon low level modules. Both shoulddepend upon abstractions. Abstractions should not depend upondetails B. Abstraction should not depend upon details. Detailsshould depend upon abstractions.”**Robert C. Martin**



When I introduced the OCP before in this article, I said that the way to implement it was to make
use of abstractions and polymorphism. I also introduced LSP in order to guide the implementation of
inheritance so our derived classes won’t break OCP. So, if you use both OCP and LSP strictly, you will
notice how a new pattern or structure emerges from it that can be generalized into what is known as
the Dependency Inversion Principle.


This is one of the most useful principles, as it allow us to design software that is flexible (easy to
change or extend), robust (reacts well to changes i.e. doesn’t break everywhere) and reusable (the
parts of the system are very decoupled and we can extract them and use them in other projects),
and whose main aim is to address bad design. The cause of bad designed software &ndash; software that
is rigid, fragile and inmobile (opposite to flexible, robust and reusable in this case) &ndash; is the heavy
hard-coded dependencies between its modules. These dependencies can in turn force the need of
a cascade of changes when we want to introduce a tiny little change in the system (rigidity), or can
result in a chain of unexpected errors (fragility), and of course, make impossible to reuse code in
other applications because everything is so entwined that we might as well bring together the whole
system.


The DIP addresses this problem saying no to hard-coded and top-down dependencies. The high-
level modules should not depend upon the low-level modules, everything has to depend upon
abstractions (thereby we get and &ldquo;inverted&rdquo; dependency). This way, the high level modules don’t
know exactly what they depend upon, they just know they are using something that must adhere
to a given interface, and thus, everything that follows that interface contract can be plugged in
(or plugged out). If you extend the principle to the whole system you end up with a set of highly
decoupled modules, that are completely isolated from changes in other modules and that can be
easily reused. You end up with a well defined set of interfaces or abstractions that define the policy
of your system, and a set of concrete implementations that are connected via these abstractions.


And last but not least, there is also a very interesting  [Hanselminutes podcast](http://hanselminutes.com/145/solid-principles-with-uncle-bob-robert-c-martin) featuring Uncle Bob and
the SOLID principles.


### Class Diagrams <a name="id6"></a>

### Which tool should be used to draw class diagrams ? <a name="sub1id5"></a>

> Draw class diagrams using a jar file. Just download from [here](/violetumleditor-2.1.0.jar) and run it.

### UML class diagram rules <a name="sub2id5"></a>

|Indicator   | Meaning       |
|----------  |---------------|       
|0..1        | Zero or one   |
|1           | One only  	 |
|0..*        | Zero or more  |
|*           | Zero or more  |
|1..*        | One or more   |
|3           |  Three only   |
|0..5   	 |  Zero to Five |
|5..15   	 |Five to Fifteen|


Bidirectional association
> ![uml1](/images/uml1.jpg)  
bi-directional association is indicated by a solid line between the two classes. At either end of the line, you place a role name and a multiplicity value. Figure 6 shows that the Flight is associated with a specific Plane, and the Flight class knows about this association. The Plane takes on the role of "assignedPlane" in this association because the role name next to the Plane class says so. The multiplicity value next to the Plane class of 0..1 means that when an instance of a Flight exists, it can either have one instance of a Plane associated with it or no Planes associated with it (i.e., maybe a plane has not yet been assigned). Figure 6 also shows that a Plane knows about its association with the Flight class. In this association, the Flight takes on the role of "assignedFlights"; the diagram in Figure 6 tells us that the Plane instance can be associated either with no flights (e.g., it's a brand new plane) or with up to an infinite number of flights (e.g., the plane has been in commission for the last five years).


Unidirectional association
> ![uml1](/images/uml2.jpg)  
A uni-directional association is drawn as a solid line with an open arrowhead (not the closed arrowhead, or triangle, used to indicate inheritance) pointing to the known class. Like standard associations, the uni-directional association includes a role name and a multiplicity value, but unlike the standard bi-directional association, the uni-directional association only contains the role name and multiplicity value for the known class. In our example in Figure 7, the OverdrawnAccountsReport knows about the BankAccount class, and the BankAccount class plays the role of "overdrawnAccounts." However, unlike a standard association, the BankAccount class has no idea that it is associated with the OverdrawnAccountsReport. [Note: It may seem strange that the BankAccount class does not know about the OverdrawnAccountsReport class. This modeling allows report classes to know about the business class they report, but the business classes do not know they are being reported on. This loosens the coupling of the objects and therefore makes the system more adaptive to changes.

Representing Packages
> ![uml1](/images/uml3.jpg)  
Inevitably, if you are modeling a large system or a large area of a business, there will be many different classifiers in your model. Managing all the classes can be a daunting task; therefore, UML provides an organizing element called a package. Packages enable modelers to organize the model's classifiers into namespaces, which is sort of like folders in a filing system. Dividing a system into multiple packages makes the system easier to understand, especially if each package represents a specific part of the system. [Note: Packages are great for organizing your model's classes, but it's important to remember that your class diagrams are supposed to easily communicate information about the system being modeled. In cases where your packages have lots of classes, it is better to use multiple topic-specific class diagrams instead of just producing one large class diagram.]

There are two ways of drawing packages on diagrams. There is no rule for determining which notation to use, except to use your personal judgement regarding which is easiest to read for the class diagram you are drawing. Both ways begin with a large rectangle with a smaller rectangle (tab) above its upper left corner, as seen in Figure 8. But the modeler must decide how the package's membership is to be shown, as follows:

If the modeler decides to show the package's members within the large rectangle, then all those members need to be placed within the rectangle. [Note: It's important to understand that when I say "all those members," I mean only the classes that the current diagram is going to show. A diagram showing a package with contents does not need to show all its contents; it can show a subset of the contained elements according to some criterion, which is not necessarily all the package's classifiers.] Also the package's name needs to be placed in the package's smaller rectangle.

> ![uml1](/images/uml4.jpg)  
If the modeler decides to show the package's members outside the large rectangle then all the members that will be shown on the diagram need to be placed outside the rectangle. To show what classifiers belong to the package, a line is drawn from each classifier to a circle that has a plus sign inside the circle attached to the package.




Now, it's time to apply all this theoretical knowledge.

### Some sample Class design scenarios <a name="id6"></a>

1. Scenario A

> “There are multiple airports all over North America. The airports each have their own an assigned unique ID. Each airport has multiple Airlines and each airline has different types of planes, pilots and staff members. The planes each have an associated plane number and model number. Each airline has planes assigned to flights to different destinations for certain dates. Each of these flights have a flight ID number and the locations of departure and arrival. Customers are able to book these flights and will be given a ticket with their ticket number and seating number. All staff should have an assigned employee number and each pilot should provide their pilot licence number in the system. All persons in the system should have their fullname and an ID number”

Create a UML class diagram to represent this information.


### Object oriented cheat-sheet <a name="id8"></a>

<iframe src="https://drive.google.com/file/d/1yU74_FZBmuKXJuugFFMrKROek4DwpKSW/preview" width="640" height="480"></iframe>

#### References <a name="id9"></a>
Ref: [IBM](https://www.ibm.com/developerworks/rational/library/content/RationalEdge/sep04/bell/index.html) | [barbarian](https://www.barbarianmeetscoding.com/blog/2010/12/02/introduction-to-principles-of-object-oriented-design/) | [Coursera](https://www.coursera.org/specializations/software-design-architecture)



