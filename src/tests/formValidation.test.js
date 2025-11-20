import { describe, it, expect } from 'vitest';

describe('Form Validation Logic', () => {
  const validateForm = (formData) => {
    const errors = {};
    
    if (!formData.id?.trim()) {
      errors.id = 'Order ID is required';
    }
    
    if (!formData.userName?.trim()) {
      errors.userName = 'User name is required';
    } else if (formData.userName.trim().length < 3) {
      errors.userName = 'User name must be at least 3 characters';
    }
    
    if (!formData.project?.trim()) {
      errors.project = 'Project name is required';
    }
    
    if (!formData.address?.trim()) {
      errors.address = 'Address is required';
    } else if (formData.address.trim().length < 5) {
      errors.address = 'Address must be at least 5 characters';
    }
    
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };

  describe('Order ID Validation', () => {
    it('should return error when Order ID is empty', () => {
      const formData = { id: '', userName: 'John', project: 'Test', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.id).toBe('Order ID is required');
    });

    it('should return error when Order ID is only whitespace', () => {
      const formData = { id: '   ', userName: 'John', project: 'Test', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.id).toBe('Order ID is required');
    });

    it('should pass when Order ID is valid', () => {
      const formData = { id: '#CM1234', userName: 'John Doe', project: 'Test', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.errors.id).toBeUndefined();
    });
  });

  describe('User Name Validation', () => {
    it('should return error when User Name is empty', () => {
      const formData = { id: '#CM123', userName: '', project: 'Test', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.userName).toBe('User name is required');
    });

    it('should return error when User Name is only whitespace', () => {
      const formData = { id: '#CM123', userName: '   ', project: 'Test', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.userName).toBe('User name is required');
    });

    it('should return error when User Name is less than 3 characters', () => {
      const formData = { id: '#CM123', userName: 'ab', project: 'Test', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.userName).toBe('User name must be at least 3 characters');
    });

    it('should pass when User Name is exactly 3 characters', () => {
      const formData = { id: '#CM123', userName: 'abc', project: 'Test', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.errors.userName).toBeUndefined();
    });

    it('should pass when User Name is valid', () => {
      const formData = { id: '#CM123', userName: 'John Doe', project: 'Test', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.errors.userName).toBeUndefined();
    });
  });

  describe('Project Validation', () => {
    it('should return error when Project is empty', () => {
      const formData = { id: '#CM123', userName: 'John', project: '', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.project).toBe('Project name is required');
    });

    it('should return error when Project is only whitespace', () => {
      const formData = { id: '#CM123', userName: 'John', project: '   ', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.project).toBe('Project name is required');
    });

    it('should pass when Project is valid', () => {
      const formData = { id: '#CM123', userName: 'John Doe', project: 'Test Project', address: '123 Street' };
      const result = validateForm(formData);
      
      expect(result.errors.project).toBeUndefined();
    });
  });

  describe('Address Validation', () => {
    it('should return error when Address is empty', () => {
      const formData = { id: '#CM123', userName: 'John', project: 'Test', address: '' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.address).toBe('Address is required');
    });

    it('should return error when Address is only whitespace', () => {
      const formData = { id: '#CM123', userName: 'John', project: 'Test', address: '   ' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.address).toBe('Address is required');
    });

    it('should return error when Address is less than 5 characters', () => {
      const formData = { id: '#CM123', userName: 'John', project: 'Test', address: 'abcd' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.address).toBe('Address must be at least 5 characters');
    });

    it('should pass when Address is exactly 5 characters', () => {
      const formData = { id: '#CM123', userName: 'John Doe', project: 'Test', address: 'abcde' };
      const result = validateForm(formData);
      
      expect(result.errors.address).toBeUndefined();
    });

    it('should pass when Address is valid', () => {
      const formData = { id: '#CM123', userName: 'John Doe', project: 'Test', address: '123 Main Street' };
      const result = validateForm(formData);
      
      expect(result.errors.address).toBeUndefined();
    });
  });

  describe('Multiple Validation Errors', () => {
    it('should return multiple errors when multiple fields are invalid', () => {
      const formData = { id: '', userName: '', project: '', address: '' };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.id).toBe('Order ID is required');
      expect(result.errors.userName).toBe('User name is required');
      expect(result.errors.project).toBe('Project name is required');
      expect(result.errors.address).toBe('Address is required');
      expect(Object.keys(result.errors).length).toBe(4);
    });

    it('should return no errors when all fields are valid', () => {
      const formData = {
        id: '#CM1234',
        userName: 'John Doe',
        project: 'Test Project',
        address: '123 Main Street',
        status: 'Pending'
      };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined formData fields', () => {
      const formData = {};
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    });

    it('should handle null formData fields', () => {
      const formData = {
        id: null,
        userName: null,
        project: null,
        address: null
      };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(false);
    });

    it('should trim whitespace when validating', () => {
      const formData = {
        id: '  #CM123  ',
        userName: '  John Doe  ',
        project: '  Test  ',
        address: '  123 Street  '
      };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(true);
    });

    it('should handle special characters in fields', () => {
      const formData = {
        id: '#CM-123@456',
        userName: 'John-Paul O\'Connor',
        project: 'Test & Development',
        address: '123 Main St., Apt #5'
      };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(true);
    });

    it('should handle unicode characters', () => {
      const formData = {
        id: '#CM123',
        userName: 'José María',
        project: 'Prøject Tëst',
        address: '北京市朝阳区'
      };
      const result = validateForm(formData);
      
      expect(result.isValid).toBe(true);
    });
  });
});
