

Introduction to GFS
--------------------

1. GFS is distrubuted filesystem for large data intensive applications
2. Shares same goals as previous distributed file systems such 
    * Performance
    * Scalability
    * Reliability and 
    * Availability

3. Design of GFS is driven by four key observations:
    * Component Failures
    * Huge files
    * Mutation of files

4. GFS Master:
    Is a Metadata server. maintains
    * File namespace
    * File to chunk mapping
    * Chunk location information
    * 
    * Does not keep persistent record ( no disk I/O)
    * Operations log for persistence and recovery

5. Chunk Server
    * 1 chunk = 64Mb or 128 Mb.
    * 