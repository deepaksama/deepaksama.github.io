


Java Streams
-------------

Java 8 Streams API: Grouping and Partitioning a Stream
-------------------------------------------------------
Consider below data

+----------+------------+-----------------+
| Name     | City       | Number of Sales |
+----------+------------+-----------------+
| Alice    | London     | 200             |
| Bob      | London     | 150             |
| Charles  | New York   | 160             |
| Dorothy  | Hong Kong  | 190             |
+----------+------------+-----------------+

### Grouping

grouping employees by city can be done using a groupingBy collector, like this:

Map<String, List<Employee>> employeesByCity =
  employees.stream().collect(groupingBy(Employee::getCity));

#### Output:
    {New York=[Charles], Hong Kong=[Dorothy], London=[Alice, Bob]}

It’s also possible to count the number of employees in each city, by passing a counting collector to the groupingBy collector. The second collector performs a further reduction operation on all the elements in the stream classified into the same group.

Map<String, Long> numEmployeesByCity =
  employees.stream().collect(groupingBy(Employee::getCity, counting()));

#### Output:
    {New York=1, Hong Kong=1, London=2}

Another example is calculating the average number of sales in each city, which can be done using the averagingInt collector in conjuction with the groupingBy collector:

Map<String, Double> avgSalesByCity =
  employees.stream().collect(groupingBy(Employee::getCity,averagingInt(Employee::getNumSales)));

#### Output:
    {New York=160.0, Hong Kong=190.0, London=175.0}

### Partitioning

Partitioning is a special kind of grouping, in which the resultant map contains at most two different groups – one for true and one for false. For instance, if you want to find out who your best employees are, you can partition them into those who made more than N sales and those who didn’t, using the partitioningBy collector:

Map<Boolean, List<Employee>> partitioned =
  employees.stream().collect(partitioningBy(e -> e.getNumSales() > 150));

#### Output:
    {false=[Bob], true=[Alice, Charles, Dorothy]}

You can also combine partitioning and grouping by passing a groupingBy collector to the partitioningBy collector. For example, you could count the number of employees in each city within each partition:

Map<Boolean, Map<String, Long>> result =
  employees.stream().collect(partitioningBy(e -> e.getNumSales() > 150,
      groupingBy(Employee::getCity, counting())));

#### Output:
    {false={London=1}, true={New York=1, Hong Kong=1, London=1}}


Ref: 

https://www.javacodegeeks.com/2015/11/java-8-streams-api-grouping-partitioning-stream.html

Best Series:
    https://shekhargulati.com/2015/07/25/day-1-lets-learn-about-lambdas/
        - http://cr.openjdk.java.net/~briangoetz/lambda/lambda-translation.html
    https://shekhargulati.com/2015/07/26/day-2-lets-learn-about-streams/
    https://shekhargulati.com/2015/07/27/day-3-lets-collect-data-using-stream-api/
    https://shekhargulati.com/2015/07/28/day-4-lets-write-null-free-java-code/

    