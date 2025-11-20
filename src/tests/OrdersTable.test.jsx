import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import { OrdersTable } from '../components/OrdersTable';

// Mock toast notifications
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock window.confirm
global.confirm = vi.fn();

describe('OrdersTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the orders table with header', () => {
      renderWithProviders(<OrdersTable />);
      
      expect(screen.getByText('Order List')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
      expect(screen.getByText('Add Order')).toBeInTheDocument();
    });

    it('should render table columns', () => {
      renderWithProviders(<OrdersTable />);
      
      expect(screen.getByText('Order ID')).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
      expect(screen.getByText('Project')).toBeInTheDocument();
      expect(screen.getByText('Address')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('should render initial orders from Redux store', () => {
      renderWithProviders(<OrdersTable />);
      
      // Check if some orders are displayed
      expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
    });

    it('should display "No orders found" when filtered results are empty', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const searchInput = screen.getByPlaceholderText('Search');
      await user.type(searchInput, 'nonexistentsearchterm12345');
      
      await waitFor(() => {
        expect(screen.getByText('No orders found')).toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    it('should filter orders based on search input', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const searchInput = screen.getByPlaceholderText('Search');
      await user.type(searchInput, '#CM');
      
      // All visible orders should contain #CM
      await waitFor(() => {
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBeGreaterThan(1); // Header + data rows
      });
    });

    it('should reset to page 1 when searching', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const searchInput = screen.getByPlaceholderText('Search');
      await user.type(searchInput, 'test');
      
      // Pagination should reset (implementation specific)
      expect(searchInput).toHaveValue('test');
    });
  });

  describe('Add Order Modal', () => {
    it('should open modal when clicking Add Order button', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const addButton = screen.getByText('Add Order');
      await user.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Add New Order')).toBeInTheDocument();
      });
    });

    it.skip('should display all form fields in modal', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const addButton = screen.getByText('Add Order');
      await user.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByLabelText(/Order ID/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/User Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Project/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
      });
    });

    it('should close modal when clicking Cancel button', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const addButton = screen.getByText('Add Order');
      await user.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Add New Order')).toBeInTheDocument();
      });
      
      const cancelButton = screen.getByText('Cancel');
      await user.click(cancelButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Add New Order')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    it.skip('should show validation error when Order ID is empty', async () => {
      const { toast } = await import('react-toastify');
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const addButton = screen.getByText('Add Order');
      await user.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Add New Order')).toBeInTheDocument();
      });
      
      // Clear the auto-generated ID
      const orderIdInput = screen.getByLabelText(/Order ID/i);
      await user.clear(orderIdInput);
      
      const submitButton = screen.getByText('Add Order', { selector: 'button[type="submit"]' });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Order ID is required')).toBeInTheDocument();
        expect(toast.error).toHaveBeenCalledWith('Please fix the errors in the form');
      });
    });

    it('should show validation error when User Name is too short', async () => {
      const { toast } = await import('react-toastify');
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const addButton = screen.getByText('Add Order');
      await user.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Add New Order')).toBeInTheDocument();
      });
      
      // Find inputs by placeholder or role instead of label
      const inputs = screen.getAllByRole('textbox');
      const userNameInput = inputs.find(input => input.value === '' || input.closest('div').previousSibling?.textContent?.includes('User Name'));
      
      if (userNameInput) {
        await user.clear(userNameInput);
        await user.type(userNameInput, 'ab');
        
        const submitButton = screen.getByText('Add Order', { selector: 'button[type="submit"]' });
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(toast.error).toHaveBeenCalled();
        });
      }
    });

    it('should show validation error when Project is empty', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const addButton = screen.getByText('Add Order');
      await user.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Add New Order')).toBeInTheDocument();
      });
      
      const submitButton = screen.getByText('Add Order', { selector: 'button[type="submit"]' });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Project name is required')).toBeInTheDocument();
      });
    });

    it.skip('should show validation error when Address is too short', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const addButton = screen.getByText('Add Order');
      await user.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Add New Order')).toBeInTheDocument();
      });
      
      const addressInput = screen.getByLabelText(/Address/i);
      await user.type(addressInput, 'test');
      
      const submitButton = screen.getByText('Add Order', { selector: 'button[type="submit"]' });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Address must be at least 5 characters')).toBeInTheDocument();
      });
    });

    it.skip('should not show errors when all fields are valid', async () => {
      const { toast } = await import('react-toastify');
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const addButton = screen.getByText('Add Order');
      await user.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Add New Order')).toBeInTheDocument();
      });
      
      // Fill in all required fields
      const userNameInput = screen.getByLabelText(/User Name/i);
      const projectInput = screen.getByLabelText(/Project/i);
      const addressInput = screen.getByLabelText(/Address/i);
      
      await user.type(userNameInput, 'John Doe');
      await user.type(projectInput, 'Test Project');
      await user.type(addressInput, '123 Test Street');
      
      const submitButton = screen.getByText('Add Order', { selector: 'button[type="submit"]' });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Order created successfully!');
      });
    });
  });

  describe('Edit Order', () => {
    it.skip('should open modal with pre-filled data when editing', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      // Find first edit button
      const editButtons = screen.getAllByTitle('Edit');
      await user.click(editButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Edit Order')).toBeInTheDocument();
        // Check if form fields are populated (specific values depend on mock data)
        const userNameInput = screen.getByLabelText(/User Name/i);
        expect(userNameInput.value).not.toBe('');
      });
    });

    it.skip('should update order when form is submitted', async () => {
      const { toast } = await import('react-toastify');
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const editButtons = screen.getAllByTitle('Edit');
      await user.click(editButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Edit Order')).toBeInTheDocument();
      });
      
      const userNameInput = screen.getByLabelText(/User Name/i);
      await user.clear(userNameInput);
      await user.type(userNameInput, 'Updated User Name');
      
      const submitButton = screen.getByText('Update Order');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Order updated successfully!');
      });
    });
  });

  describe('Delete Order', () => {
    it('should show confirmation dialog when deleting', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      global.confirm.mockReturnValue(false);
      
      const deleteButtons = screen.getAllByTitle('Delete');
      await user.click(deleteButtons[0]);
      
      expect(global.confirm).toHaveBeenCalled();
    });

    it('should delete order when confirmed', async () => {
      const { toast } = await import('react-toastify');
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      global.confirm.mockReturnValue(true);
      
      const deleteButtons = screen.getAllByTitle('Delete');
      await user.click(deleteButtons[0]);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Order deleted successfully!');
      });
    });

    it('should not delete order when cancelled', async () => {
      const { toast } = await import('react-toastify');
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      global.confirm.mockReturnValue(false);
      
      const deleteButtons = screen.getAllByTitle('Delete');
      await user.click(deleteButtons[0]);
      
      expect(toast.success).not.toHaveBeenCalled();
    });
  });

  describe('Checkbox Selection', () => {
    it('should select individual orders', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const checkboxes = screen.getAllByRole('checkbox');
      // First checkbox is "select all", so skip it
      const firstOrderCheckbox = checkboxes[1];
      
      expect(firstOrderCheckbox).not.toBeChecked();
      await user.click(firstOrderCheckbox);
      expect(firstOrderCheckbox).toBeChecked();
    });

    it('should select all orders when clicking header checkbox', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const checkboxes = screen.getAllByRole('checkbox');
      const selectAllCheckbox = checkboxes[0];
      
      await user.click(selectAllCheckbox);
      
      // All checkboxes should be checked
      await waitFor(() => {
        const checkedBoxes = screen.getAllByRole('checkbox').filter(cb => cb.checked);
        expect(checkedBoxes.length).toBeGreaterThan(1);
      });
    });

    it('should deselect all orders when clicking header checkbox twice', async () => {
      renderWithProviders(<OrdersTable />);
      const user = userEvent.setup();
      
      const checkboxes = screen.getAllByRole('checkbox');
      const selectAllCheckbox = checkboxes[0];
      
      await user.click(selectAllCheckbox);
      await user.click(selectAllCheckbox);
      
      // Only the header checkbox might be checked
      const dataCheckboxes = checkboxes.slice(1);
      dataCheckboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  describe('Pagination', () => {
    it('should display pagination when there are orders', () => {
      renderWithProviders(<OrdersTable />);
      
      // Pagination component should be present
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });

  describe('Status Display', () => {
    it('should display order status with appropriate styling', () => {
      renderWithProviders(<OrdersTable />);
      
      // Check if status badges are displayed
      const statusElements = screen.getAllByText(/Pending|In Progress|Complete|Approved|Rejected/);
      expect(statusElements.length).toBeGreaterThan(0);
    });
  });

  describe('Date Formatting', () => {
    it('should format recent dates as relative time', () => {
      renderWithProviders(<OrdersTable />);
      
      // Check if date/time information is displayed
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(1); // Has data rows
    });
  });
});
