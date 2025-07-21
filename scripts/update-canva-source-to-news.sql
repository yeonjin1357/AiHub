-- Update all Canva service_updates to have source='news'
UPDATE service_updates 
SET source = 'news'
WHERE service_id = (
    SELECT id 
    FROM ai_services 
    WHERE LOWER(name) LIKE '%canva%' 
    LIMIT 1
);

-- Verify the update
SELECT 
    su.id,
    su.title,
    su.source,
    su.source_name,
    su.published_at
FROM service_updates su
JOIN ai_services s ON su.service_id = s.id
WHERE LOWER(s.name) LIKE '%canva%'
ORDER BY su.published_at DESC;