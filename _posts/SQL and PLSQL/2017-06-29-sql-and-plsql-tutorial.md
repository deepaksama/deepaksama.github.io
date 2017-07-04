---
layout: post
title: SQL and PLSQL
meta: Web Service Implementation Bottom-up approach
category: Oracle
---

<div id="tableofcontents" class="col-md-6 pull-right">	
</div>

### SQL Commands

SQL commands fall under below categories.
* DDL ( Data Definition Language )
	* Interact directly with Database.
	* An implicit commit is applied before and after DDL commands.
	* Undo cannot be done on DDL
	* Following are DDL commands
		* Create
		* Alter
		* Truncate
		* Rename
		* Drop
		* FlashBack
		* Purge
		* Comment
		
* DML ( Data Manipulation Language )
	* Interact through buffer. 
	* Slower compared to DDL due to buffer involvement.
	* As they applied to buffer they can be rolledback.
	* Categoriesed into 
		* Read
			* Below is the command under this category
				* SELECT
		* Write
			* Below are the commands under this category:
				* INSERT
				* UPDATE
				* DELETE
				* MERGE
			* Row level locks are placed implicitly on the rows which are affected by these commands.
			
		
* TCL (Transaction Control Language )
	* Can be executed only under a transaction
	* Categorized into 
		* Transaction : Starts with DML write obperation and ends with commit/rollback.  The commit/rollback would be Implicit or Explicit.
		* Commit : This makes the changes permanent.
		* Rollback : Will undo the changes done by previous DML command.
		* Savepoint : A temporary saving point within a transaction.
* DCL (Data Control Language)
	* These commands directly interact with database.
	* These commands deal only with Privileges only
	* DCL commands enforce implicit commit before and after statement.
	* Rollback or Undo cannot be done on DCL statements.
	* DCL commands:
		* GRANT
		* REVOKE
		* SET ROLE

**SQL commands summary Table**

<div class="col-md-8">
	<table class="table table-striped table-bordered">
		<thead>
			<tr>	
				<td>DDL</td>
				<td>DML</td>
				<td>TCL</td>
				<td>DCL</td>
			</tr>
		</thead>
		<tbody>
			<tr>	
				<td>
					<UL>
						<LI>CREATE</LI>
						<LI>ALTER</LI>
						<LI>TRUNCATE</LI>
						<LI>RENAME</LI>
						<LI>DROP</LI>
						<LI>FLASHBACK</LI>
						<LI>PURGE</LI>
						<LI>COMMENT</LI>
					</UL>
				</td>
				<td>
					<b> Read </b><br/>
					<ul>
					<li>
					SELECT
					</li>
					</ul>
					<b> Write </b> 
					<ul>
						<li>INSERT</li>
						<li>UPDATE</li>
						<li>DELETE</li>
						<li>MERGE</li>
					</ul>
				</td>
				<td>
					<ul>
						<li>COMMIT</li>
						<li>ROLLBACK</li>
						<li>SAVEPOINT</li>
						<li>SET TRANSACTION
						</li></ul>
				</td>
				<td>
					<ul>
						<li>GRANT</li>
						<li>REVOKE</li>
						<li>SET ROLE</li>
					</ul>
				</td>
			</tr>
		</tbody>
	</table>
</div>