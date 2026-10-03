Transport UI Cleanup - 28 Sep 2026

Changes
1. PI TransportSelector
   - Surface transporter dropdown now shows transporter name only.
   - Removed transporter type, priority and system-default text from option labels.

2. Transporter Finder
   - Surface/Courier/Local-Aggregator finder retained.
   - View Contacts retained.
   - Added Search Transporter field for returned results.
   - Removed Priority and Default columns from Surface results.

3. Serviceability / Transport Mapping
   - Removed PRIORITY and IS SYSTEM DEFAULT columns from list.
   - Removed System Default toggle from Create Mapping.
   - Removed System Default toggle from Update Mapping.

4. Resolve Mapping Request
   - Removed Priority selector from UI.
   - Resolve sends transporter_id only; backend already defaults omitted mapping priority.

5. Mapping Request Update text
   - Removed priority wording from user-facing instruction.

Important
- Backend model fields were not deleted. This patch removes these concepts from transporter UI only, avoiding DB/schema risk.
- No optional chaining or nullish coalescing added.
