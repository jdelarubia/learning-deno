# Example using Worker + localStorage

Demo that combines the use of Permissions, Workers and Web Storage APIs.

The app uses a worker to log our command line interactive session to a file. To
achieve that it requests read access to the worker and write access to a text
file where it stores the interactions. The log is not permanent and starts
afresh with every execution.

Not very useful but valid just for demonstration purposes.

## Resources

- [DENO documentation](https://doc.deno.land/deno/stable)
- [DENO Workers API](https://deno.land/manual/runtime/workers)
- [SITEPOINT Working with the File System in Deno](https://www.sitepoint.com/deno-file-system/)
