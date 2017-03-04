---
layout: post
title: Java Interview Questions
meta: Java Interview Questions
category: java
---

Core Java
Memory Management

{% highlight java linenos %}
package algorithms;

import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveAction;
import java.util.concurrent.RecursiveTask;

public class MergeSort {

	private Integer [] elements;
	public static int TASK_NUM = 1;
	public static int ALLOWED_SIZE = 1;
	class MSTask extends RecursiveAction{//RecursiveTask<MSTask>

		private int start;
		private int end;
		private Integer [] array;
		private int taskNum;
		
		public MSTask(int start, int end, Integer [] array) {
			this.start = start;
			this.end = end;
			this.array = array;
			this.taskNum = TASK_NUM++;
			System.out.println("Task(" + taskNum + ") from: " + start + ", to: " + end);
		}
		
		@Override
		protected void compute() {
			
			int length = end - start;
			
			if(length == 0) {
				System.out.println("Task(" + taskNum + ") Working..");
				//return this;
			} else {
				System.out.println("Task(" + taskNum + ") Splitting work..");
				int mid = (start + end) / 2;
				MSTask task1 = new MSTask(start,mid,array);
				task1.fork();
				
				MSTask task2 = new MSTask(mid+1,end,array);
				task2.compute();
				
				task1.join();
				
				merge(task1,task2);
			}			
			//return this;
		}
		
		public void merge(MSTask t1, MSTask t2) {
						
			int i = t1.start;
			int j = t2.start;
			int k = 0;
			int [] temp = new int[t1.array.length];
			while(i <= t1.end && j <= t2.end) {			
				System.out.println("i = " + i + " j =  " + j);
				if( t1.array[i] > t2.array[j]) {
					
					temp[k++] = t2.array[j++];
					
				} else {
					
					temp[k++] = t1.array[i++];
				}
			}
			
			while(i <= t1.end )
				temp[k++] = t1.array[i++];
			
			while(j <= t2.end )
				temp[k++] = t2.array[j++];
			
			int index = t1.start;
			int x = 0;
			while(x < k) {
				t1.array[index++] = temp[x++];
			}
		}
		
		public void print() {
			for(int i = start; i <= end; i++) {
				System.out.print(array[i]);
			}
		}

	}
	
	public MergeSort(Integer [] array) {
		elements = array;
		MSTask task = new MSTask(0,array.length - 1,array);
		System.out.println("Starting pool");
		ForkJoinPool pool = new ForkJoinPool(Runtime.getRuntime().availableProcessors());
		pool.invoke(task);
		System.out.println("Pool Size : " + pool.getPoolSize() + " Steal Count : " + pool.getStealCount());
		
		System.out.println("Ending pool");
	}
	
}
{% endhighlight %}

<!--
https://demisx.github.io/jekyll/2014/01/13/improve-code-highlighting-in-jekyll.html
-->