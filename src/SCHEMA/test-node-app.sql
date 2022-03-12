-- Get all data
select * from produ	cts;
    
-- fetch by id
select * 
	from products
	where ID = 25;

-- insert new data
insert 
	into products(name, price) 
    values ('book2', 5);
    
-- delete by id
delete
	from products
	where ID = 25;
    
-- delete all data
truncate
	table products;