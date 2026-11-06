CREATE TABLE organization (
	org_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(225) NOT NULL,
	logo_file_name  VARCHAR(225) NOT NULL
);


INSERT INTO organization (name, description, contact_email, logo_file_name)
VALUES(DEFAULT,'BrightFuture Builders', 'A nonprofit focused on imporving community infrastructure through sustainable construction projects', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
	(DEFAULT,'GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.','contact@greenharvest.org', 'greenharvest-logo.png'),
	(DEFAULT,'UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives', 'hello@unityserve.org', 'unityserve-logo.png');

	-- SELECT * FROM organization;

CREATE TABLE projects(
	project_id SERIAL PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(200) NOT NULL,
	date DATE,
	org_id INT NOT NULL,

	FOREIGN KEY (org_id)
	REFERENCES organization(org_id)
);

-- SELECT * FROM projects;

INSERT INTO projects (title, description, location, date, org_id)
VALUES
-- Organization 1
('Community Health Awareness',
 'Organizing community workshops to educate residents about disease prevention and healthy living.',
 'Monrovia, Liberia', '2026-01-15', 1),

('Clean Water Initiative',
 'Providing access to clean and safe drinking water through the construction of community wells.',
 'Bensonville, Liberia', '2026-02-20', 1),

('Youth Skills Development',
 'Providing vocational training and professional development opportunities for unemployed youth.',
 'Paynesville, Liberia', '2026-03-10', 1),

('School Renovation Project',
 'Renovating classrooms and improving learning facilities in underserved communities.',
 'Buchanan, Liberia', '2026-04-05', 1),

('Women Empowerment Program',
 'Supporting women through entrepreneurship training and small business development.',
 'Kakata, Liberia', '2026-05-12', 1),

-- Organization 2
('Road Rehabilitation',
 'Repairing damaged community roads to improve transportation and accessibility.',
 'Gbarnga, Liberia', '2026-01-25', 2),

('Environmental Protection',
 'Promoting environmental sustainability through tree planting and community sanitation.',
 'Harper, Liberia', '2026-02-15', 2),

('Digital Literacy Program',
 'Teaching basic computer skills and digital literacy to students and adults.',
 'Monrovia, Liberia', '2026-03-18', 2),

('Agricultural Support Initiative',
 'Providing farmers with improved farming techniques, seeds, and agricultural resources.',
 'Ganta, Liberia', '2026-04-22', 2),

('Community Library Project',
 'Establishing a community library to improve access to educational materials.',
 'Zwedru, Liberia', '2026-05-30', 2),

-- Organization 3
('Small Business Development',
 'Helping local entrepreneurs establish and expand small businesses through mentorship.',
 'Paynesville, Liberia', '2026-01-18', 3),

('Public Health Outreach',
 'Conducting health screenings and providing basic medical education in rural communities.',
 'Sanniquellie, Liberia', '2026-02-28', 3),

('Girls Education Initiative',
 'Promoting access to education for girls through scholarships and educational support.',
 'Tubmanburg, Liberia', '2026-03-25', 3),

('Waste Management Program',
 'Developing sustainable waste collection and disposal systems within local communities.',
 'Monrovia, Liberia', '2026-04-15', 3),

('Food Security Initiative',
 'Supporting vulnerable households through food distribution and agricultural programs.',
 'Voinjama, Liberia', '2026-05-20', 3);

