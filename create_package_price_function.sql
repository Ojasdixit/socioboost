-- Create a function to get all packages with calculated prices
CREATE OR REPLACE FUNCTION get_packages_with_prices()
RETURNS SETOF json AS $$
DECLARE
  package_record RECORD;
  result_json json;
BEGIN
  FOR package_record IN 
    SELECT 
      pp.id,
      pp.name,
      pp.description,
      pp.discount_percentage,
      pp.is_featured,
      pp.created_at,
      pp.updated_at
    FROM product_packages pp
    ORDER BY pp.name
  LOOP
    -- Calculate the total price of all products in the package
    WITH package_price AS (
      SELECT 
        SUM(p.price * ppi.quantity) AS total_price
      FROM product_package_items ppi
      JOIN products p ON ppi.product_id = p.id
      WHERE ppi.package_id = package_record.id
    )
    SELECT 
      json_build_object(
        'id', package_record.id,
        'name', package_record.name,
        'description', package_record.description,
        'discount_percentage', package_record.discount_percentage,
        'is_featured', package_record.is_featured,
        'created_at', package_record.created_at,
        'updated_at', package_record.updated_at,
        'calculated_price', COALESCE(pp.total_price, 0),
        'calculated_discounted_price', COALESCE(pp.total_price * (1 - package_record.discount_percentage / 100), 0)
      ) INTO result_json
    FROM package_price pp;
    
    RETURN NEXT result_json;
  END LOOP;
  
  RETURN;
END;
$$ LANGUAGE plpgsql; 