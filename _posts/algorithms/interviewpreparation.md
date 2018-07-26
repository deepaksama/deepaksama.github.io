

Hash Tables and Sorting ( Beginner level)
-----------------------------------------

	A good sorting algorithms take O(nlogn) worst case time complexity .

1. Find if an array has duplicates?

Ex: [7,5,2,1,0,2,3]

a. Brute force method:
	Take each element of array and check whether that element appears again int the array.
	Time Complexity O(n^2)
	
b. Method 2
	Sort the array and check for adjacent elements.
	Time complexity = Time Complexity for sorting + Time complexity for finding duplicates
					= O(nlogn) + O(n)
					= O(nlogn)
	
	Space complexity of O(1) if in space sorting is used. 
	
c. Method 3:
	User hash table and find element in hash, if not found insert into the hash map.
	if found that is duplicate.
	This would take O(n) time complexity.  But downside of this algorithm is it takes space.
	
	
Comparison of Hash Table and Arrays

Hash Tables
-----------
1. Allows  key, value pairs
	Ex: table.put("key1", "value1");
	
	Note: key can be Integer, String or Object
2. Lookups takes O(1)

3. As hash tables take up lot of space, they may not be ideal choice if you looking for space efficient solution.

4. There is no order of keys 

Arrays :
---------
1. Allows values to be stored at an index
	Ex: a[26] = 5;  0 <= i < a.length
	
2. Lookups takes O(n)

3. Space efficient

4. Elements can be iterated from 0 --> length -1


Big O notation
--------------

Complexities in order of increase

O(n) < O(log n) < O(n) < O(nlog n) < O(n^2) < O(n ^2 log n) < O(n^3) 

