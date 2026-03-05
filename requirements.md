Algorithmic Strategy Generation System (ASGS) Detailed Requirements Specification Document

Project Identification
1.1 Project Name
Algorithmic Strategy Generation System (ASGS)

1.2 Project Type
AI-based reasoning and decision-support system for algorithmic problem solving.

1.3 Project Description
ASGS is a system designed to analyze natural language programming problem statements and produce a structured explanation of the algorithmic strategy required to solve them.

Instead of generating executable code, the system focuses on explaining:

Which algorithmic approach should be used
Why that approach is correct
Why other common approaches fail
How constraints influence algorithm choice
This project emphasizes thinking before coding, which is a critical skill in software engineering, competitive programming, and technical interviews.

Purpose of the Requirements Document
The purpose of this requirements.md file is to clearly define WHAT the system needs in order to:

Be understood by new contributors
Be set up correctly
Be evaluated objectively
Avoid ambiguity and scope creep
This document does NOT explain how the system is implemented or deployed.
All procedural and deployment-related details are documented separately in details.md.

Problem Motivation
In many programming scenarios, the hardest part is not writing code but:

Understanding the problem correctly
Identifying the right algorithm
Avoiding inefficient or incorrect strategies
Most tools and learning resources either jump directly to code or provide solutions without explaining the reasoning.

ASGS addresses this gap by making algorithmic reasoning explicit, structured, and explainable.

System Scope
4.1 In-Scope Features

The system SHALL support the following:

Acceptance of plain English programming problem statements
Identification of key entities (arrays, graphs, trees, strings, etc.)
Extraction of objectives (maximize, minimize, count, find existence)
Detection and interpretation of constraints
Classification into known algorithmic problem patterns
Constraint-based elimination of infeasible approaches
Selection of exactly one optimal algorithmic strategy
Explanation of why the selected strategy works
Explanation of why alternative strategies fail
Reporting of time and space complexity
Generation of structured, readable explanations
4.2 Out-of-Scope Features

The system SHALL NOT:

Generate executable code or full implementations
Compile or run any programs
Automatically verify correctness of solutions
Provide graphical user interfaces or frontend features
Solve non-algorithmic or purely theoretical mathematics problems
Replace human decision-making or learning
Functional Requirements
FR-1: The system MUST accept a natural language problem statement as input
FR-2: The system MUST extract entities, objectives, and constraints from the input
FR-3: The system MUST map the problem to known algorithmic patterns
FR-4: The system MUST analyze constraints to determine feasibility
FR-5: The system MUST reject infeasible or inefficient approaches
FR-6: The system MUST select exactly one optimal algorithmic strategy
FR-7: The system MUST explain the reasoning behind the selected strategy
FR-8: The system MUST explain at least one rejected or incorrect approach
FR-9: The system MUST report time complexity using Big-O notation
FR-10: The system MUST report space complexity using Big-O notation
Non-Functional Requirements
Quality and Performance:

The system SHOULD produce deterministic outputs for identical inputs
All decisions MUST be explainable and traceable
The system SHOULD respond within acceptable interactive latency (less than 2 seconds)
The system SHOULD handle invalid or ambiguous inputs gracefully
Maintainability and Extensibility:

The system MUST be modular in design
New algorithmic patterns SHOULD be easy to add
Knowledge base updates SHOULD not require major refactoring
Technology Stack Requirements
Programming Language:

Python 3.10 or higher
Core Libraries and Frameworks:

FastAPI for API-based interaction
spaCy or Transformers for natural language understanding
Pydantic for data validation
Uvicorn as ASGI server
Development Tools:

Git for version control
pip for dependency management
virtualenv or venv for environment isolation
Platform and Infrastructure Requirements
Linux-based operating system (Ubuntu preferred)
Ability to deploy on cloud infrastructure (AWS EC2)
Internet access for downloading dependencies
Support for environment variable configuration
Environment Setup Requirements
Python virtual environment must be used
Environment variables must be configurable
Application must support configurable ports (80 or 8000)
Logging capability must be available
AWS-Specific Requirements
Required AWS Services:

EC2 for backend compute
S3 for knowledge base, logs, and test data
IAM for role-based access control
CloudWatch for logging and monitoring
VPC for network isolation
Security Groups for firewall configuration
Compute Requirements:

Instance Type: t3.medium (minimum)
vCPUs: 2
RAM: 4 GB
Storage: Minimum 20 GB (EBS)
Operating System: Ubuntu 22.04 LTS
Security Requirements
No AWS credentials hardcoded in code or repository
All secrets must be managed via environment variables
IAM roles must follow least-privilege principle
SSH access must use key-based authentication
S3 buckets must be private by default
Data Requirements
Algorithm knowledge base containing rules, patterns, and complexities
Sample problem statements for testing and validation
Logs capturing reasoning steps and errors
No sensitive or personal user data stored
Constraints
English-language input only
Only algorithmic programming problems supported
Limited cloud budget (free-tier preferred)
No automatic code generation
Accuracy depends on the quality of the knowledge base
Assumptions
Problem statements contain explicit or inferable constraints
Standard algorithmic paradigms are applicable
Users expect explanation rather than implementation
System is used as a decision-support and learning tool
Installation Prerequisites
Python 3.10 or higher
pip package manager
Git
Linux, macOS, or Windows with WSL support
Acceptance Criteria
The system SHALL be considered acceptable if:

It runs successfully in the target environment
It correctly identifies algorithmic strategies for test cases
It rejects infeasible approaches based on constraints
It generates clear, structured explanations
It logs reasoning steps without runtime errors
Repository-Level Notes
This document defines WHAT is required for the project
Implementation, deployment, and operational steps are documented in details.md
Any changes to scope must be reflected in this file
