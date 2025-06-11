CREATE TABLE google_ads_campaigns (          
id UUID NOT NULL DEFAULT gen_random_uuid(),
strategy_id UUID NOT NULL,                 
name TEXT NOT NULL,                        
status TEXT DEFAULT 'draft'::text,         
budget_daily INTEGER,                      
budget_total INTEGER,                      
start_date DATE,                           
end_date DATE,                             
campaign_type TEXT DEFAULT 'search'::text, 
target_locations TEXT[],                   
ad_groups JSONB,                           
keywords_final TEXT[],                     
created_at TIMESTAMPTZ DEFAULT now(),      
updated_at TIMESTAMPTZ DEFAULT now()       
);
CREATE TABLE marketing_strategies (          
id UUID NOT NULL DEFAULT gen_random_uuid(),
website_analysis_id UUID NOT NULL,         
title TEXT NOT NULL,                       
target_audience TEXT NOT NULL,             
budget_recommendation INTEGER NOT NULL,    
notes TEXT NOT NULL,                       
industry_override TEXT,                    
created_at TIMESTAMPTZ DEFAULT now(),      
updated_at TIMESTAMPTZ DEFAULT now()       
);
CREATE TABLE profiles (                      
id UUID NOT NULL,                          
role TEXT NOT NULL DEFAULT 'user'::text    
);
CREATE TABLE website_analyses (              
id UUID NOT NULL DEFAULT gen_random_uuid(),
url TEXT NOT NULL,                         
description TEXT NOT NULL,                 
keywords TEXT[] NOT NULL,                  
industry TEXT NOT NULL,                    
created_at TIMESTAMPTZ DEFAULT now(),      
updated_at TIMESTAMPTZ DEFAULT now()       
);
